import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { businessConfig } from '../src/config/business.js';
import { servicesData } from '../src/data/services.js';
import { Admin } from './models/Admin.js';
import { BusinessSettings } from './models/BusinessSettings.js';
import { Service } from './models/Service.js';

let isMongoConnected = false;

// Fallback in-memory state if MongoDB server is offline
export const memoryStore = {
  admin: null,
  businessSettings: null,
  services: []
};

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login_computer_centre';
  
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
    await seedInitialData();
  } catch (err) {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB connection warning:', err.message);
    console.warn('⚡ Operating in resilient memory mode with seeded default data.');
    seedMemoryStore();
  }
}

export function getIsMongoConnected() {
  return isMongoConnected;
}

// Initial Data Seeder for MongoDB
async function seedInitialData() {
  try {
    // 1. Seed / Update Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'login').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Login@123';
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    
    await Admin.findOneAndUpdate(
      { email: adminEmail },
      { email: adminEmail, passwordHash },
      { upsert: true, new: true }
    );
    console.log(`👤 Admin account configured: ${adminEmail}`);

    // 2. Seed Business Settings
    const existingSettings = await BusinessSettings.findOne();
    if (!existingSettings) {
      await BusinessSettings.create({
        ...businessConfig,
        isOpen: true,
        specialNotice: ""
      });
      console.log('⚙️ Seeded initial business settings.');
    }

    // 3. Seed / Sync Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(servicesData);
      console.log(`📦 Seeded ${servicesData.length} initial services into MongoDB.`);
    } else {
      for (const service of servicesData) {
        await Service.updateOne(
          { id: service.id },
          { 
            $set: { 
              shortDescription: service.shortDescription,
              purpose: service.purpose,
              documents: service.documents,
              icon: service.icon
            } 
          }
        );
      }
    }
  } catch (seedErr) {
    console.error('Error seeding initial MongoDB data:', seedErr);
  }
}

// Seed In-Memory Store for fallback mode
function seedMemoryStore() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'login').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Login@123';

  memoryStore.admin = {
    email: adminEmail,
    passwordHash: bcrypt.hashSync(adminPassword, 10)
  };

  memoryStore.businessSettings = {
    ...businessConfig,
    isOpen: true,
    specialNotice: ""
  };

  memoryStore.services = JSON.parse(JSON.stringify(servicesData));
  console.log(`⚡ Memory store ready with admin (${adminEmail}) and ${memoryStore.services.length} services.`);
}
