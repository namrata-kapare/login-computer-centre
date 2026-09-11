import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

dotenv.config();

import { connectDB, getIsMongoConnected, memoryStore } from './server/db.js';
import { Admin } from './server/models/Admin.js';
import { BusinessSettings } from './server/models/BusinessSettings.js';
import { Service } from './server/models/Service.js';
import { authMiddleware } from './server/middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'login_computer_centre_default_jwt_secret';

app.use(cors());
app.use(express.json());

// Initialize Database connection & seed initial data
connectDB();

// ------------------------------------------------------------------
// AUTHENTICATION API ENDPOINTS
// ------------------------------------------------------------------

// 1. Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const inputEmail = (email || username || '').toLowerCase().trim();

    if (!inputEmail || !password) {
      return res.status(400).json({ error: 'वापरकर्तानाव व पासवर्ड आवश्यक आहे.' });
    }

    let adminUser = null;

    if (getIsMongoConnected()) {
      adminUser = await Admin.findOne({ email: inputEmail });
    } else {
      if (memoryStore.admin && memoryStore.admin.email === inputEmail) {
        adminUser = memoryStore.admin;
      }
    }

    if (!adminUser) {
      return res.status(401).json({ error: 'वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे.' });
    }

    const isMatch = bcrypt.compareSync(password, adminUser.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे.' });
    }

    const token = jwt.sign({ email: adminUser.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      token,
      admin: { email: adminUser.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'सर्वर त्रुटी. कृपया पुन्हा प्रयत्न करा.' });
  }
});

// 2. Get Current Admin Profile
app.get('/api/admin/me', authMiddleware, (req, res) => {
  return res.json({ admin: req.admin });
});

// 3. Admin Logout
app.post('/api/admin/logout', authMiddleware, (req, res) => {
  return res.json({ success: true, message: 'लॉगआउट यशस्वी झाले.' });
});

// ------------------------------------------------------------------
// PUBLIC BUSINESS INFO & TIMING ENDPOINTS
// ------------------------------------------------------------------

// Get Business Config & Settings (Public)
app.get('/api/business', async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      let settings = await BusinessSettings.findOne();
      if (!settings) {
        settings = await BusinessSettings.create({ ...memoryStore.businessSettings });
      }
      return res.json(settings);
    } else {
      return res.json(memoryStore.businessSettings);
    }
  } catch (err) {
    console.error('Error fetching business info:', err);
    return res.status(500).json({ error: 'माहिती लोड करताना अडचण आली.' });
  }
});

// Update Business Contact Info (Protected Admin)
app.put('/api/admin/business', authMiddleware, async (req, res) => {
  try {
    const { businessNameMarathi, phone, email, address } = req.body;
    
    const updateData = {};
    if (businessNameMarathi) updateData.businessNameMarathi = businessNameMarathi;
    if (phone) {
      updateData.phone = phone;
      updateData.phoneRaw = phone.replace(/[^0-9]/g, '');
    }
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    updateData.updatedAt = new Date();

    if (getIsMongoConnected()) {
      const updated = await BusinessSettings.findOneAndUpdate({}, updateData, { new: true, upsert: true });
      return res.json(updated);
    } else {
      memoryStore.businessSettings = { ...memoryStore.businessSettings, ...updateData };
      return res.json(memoryStore.businessSettings);
    }
  } catch (err) {
    console.error('Error updating business contact:', err);
    return res.status(500).json({ error: 'माहिती अपडेट करण्यात अडचण आली.' });
  }
});

// Update Office Timing (Protected Admin)
app.put('/api/admin/timing', authMiddleware, async (req, res) => {
  try {
    const { openingTime, closingTime } = req.body;
    if (!openingTime || !closingTime) {
      return res.status(400).json({ error: 'उघडण्याची आणि बंद होण्याची वेळ आवश्यक आहे.' });
    }

    const todayTimingText = `${openingTime} ते ${closingTime}`;

    if (getIsMongoConnected()) {
      const settings = await BusinessSettings.findOne();
      if (settings) {
        settings.openingTime = openingTime;
        settings.closingTime = closingTime;
        settings.todayTimingText = todayTimingText;
        if (!settings.timing) settings.timing = {};
        settings.timing.openingTime = openingTime;
        settings.timing.closingTime = closingTime;
        settings.timing.todayTimingText = todayTimingText;
        settings.updatedAt = new Date();
        await settings.save();
        return res.json(settings);
      }
    } else {
      memoryStore.businessSettings.openingTime = openingTime;
      memoryStore.businessSettings.closingTime = closingTime;
      memoryStore.businessSettings.todayTimingText = todayTimingText;
      if (!memoryStore.businessSettings.timing) memoryStore.businessSettings.timing = {};
      memoryStore.businessSettings.timing.openingTime = openingTime;
      memoryStore.businessSettings.timing.closingTime = closingTime;
      memoryStore.businessSettings.timing.todayTimingText = todayTimingText;
      return res.json(memoryStore.businessSettings);
    }
  } catch (err) {
    console.error('Error updating timing:', err);
    return res.status(500).json({ error: 'वेळ अपडेट करण्यात अडचण आली.' });
  }
});

// Update Open/Closed Status (Protected Admin)
app.put('/api/admin/status', authMiddleware, async (req, res) => {
  try {
    const { isOpen } = req.body;
    if (typeof isOpen !== 'boolean') {
      return res.status(400).json({ error: 'योग्य स्थिती निवडा.' });
    }

    if (getIsMongoConnected()) {
      const updated = await BusinessSettings.findOneAndUpdate({}, { isOpen, updatedAt: new Date() }, { new: true });
      return res.json(updated);
    } else {
      memoryStore.businessSettings.isOpen = isOpen;
      return res.json(memoryStore.businessSettings);
    }
  } catch (err) {
    console.error('Error updating office status:', err);
    return res.status(500).json({ error: 'स्थिती अपडेट करण्यात अडचण आली.' });
  }
});

// Update Special Notice (Protected Admin)
app.put('/api/admin/notice', authMiddleware, async (req, res) => {
  try {
    const { specialNotice } = req.body;
    const noticeText = typeof specialNotice === 'string' ? specialNotice.trim() : '';

    if (getIsMongoConnected()) {
      const updated = await BusinessSettings.findOneAndUpdate({}, { specialNotice: noticeText, updatedAt: new Date() }, { new: true });
      return res.json(updated);
    } else {
      memoryStore.businessSettings.specialNotice = noticeText;
      return res.json(memoryStore.businessSettings);
    }
  } catch (err) {
    console.error('Error updating notice:', err);
    return res.status(500).json({ error: 'सूचना अपडेट करण्यात अडचण आली.' });
  }
});

// ------------------------------------------------------------------
// SERVICES MANAGEMENT API ENDPOINTS
// ------------------------------------------------------------------

// Get Services (Public: active only | Admin with ?all=true: all services)
app.get('/api/services', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';

    if (getIsMongoConnected()) {
      const filter = showAll ? {} : { isActive: true };
      const services = await Service.find(filter).sort({ id: 1 });
      return res.json(services);
    } else {
      let services = memoryStore.services;
      if (!showAll) {
        services = services.filter(s => s.isActive !== false);
      }
      return res.json(services);
    }
  } catch (err) {
    console.error('Error fetching services:', err);
    return res.status(500).json({ error: 'सेवा लोड करण्यात अडचण आली.' });
  }
});

// Add New Service (Protected Admin)
app.post('/api/admin/services', authMiddleware, async (req, res) => {
  try {
    const { marathiName, englishName, category, shortDescription, purpose, documents, keywords, isActive, icon } = req.body;

    if (!marathiName || !englishName || !category) {
      return res.status(400).json({ error: 'मराठी नाव, इंग्रजी नाव आणि वर्ग (Category) आवश्यक आहे.' });
    }

    if (getIsMongoConnected()) {
      const maxService = await Service.findOne().sort({ id: -1 });
      const nextId = maxService ? maxService.id + 1 : 1;

      const newService = await Service.create({
        id: nextId,
        marathiName,
        englishName,
        category,
        shortDescription: shortDescription || '',
        purpose: purpose || '',
        documents: Array.isArray(documents) ? documents : [],
        keywords: Array.isArray(keywords) ? keywords : [],
        isActive: isActive !== false,
        icon: icon || 'FileText'
      });
      return res.status(201).json(newService);
    } else {
      const maxId = memoryStore.services.reduce((max, s) => s.id > max ? s.id : max, 0);
      const newService = {
        id: maxId + 1,
        marathiName,
        englishName,
        category,
        shortDescription: shortDescription || '',
        purpose: purpose || '',
        documents: Array.isArray(documents) ? documents : [],
        keywords: Array.isArray(keywords) ? keywords : [],
        isActive: isActive !== false,
        icon: icon || 'FileText',
        availabilityMessage: "सेवेची सध्याची उपलब्धता जाणून घेण्यासाठी आमच्याशी संपर्क साधा."
      };
      memoryStore.services.push(newService);
      return res.status(201).json(newService);
    }
  } catch (err) {
    console.error('Error creating service:', err);
    return res.status(500).json({ error: 'नवीन सेवा जोडण्यात अडचण आली.' });
  }
});

// Edit Service (Protected Admin)
app.put('/api/admin/services/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateData = { ...req.body, updatedAt: new Date() };

    if (getIsMongoConnected()) {
      const updated = await Service.findOneAndUpdate({ id }, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ error: 'सेवा सापडली नाही.' });
      }
      return res.json(updated);
    } else {
      const index = memoryStore.services.findIndex(s => s.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'सेवा सापडली नाही.' });
      }
      memoryStore.services[index] = { ...memoryStore.services[index], ...updateData };
      return res.json(memoryStore.services[index]);
    }
  } catch (err) {
    console.error('Error updating service:', err);
    return res.status(500).json({ error: 'सेवा अपडेट करण्यात अडचण आली.' });
  }
});

// Delete Service (Protected Admin)
app.delete('/api/admin/services/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (getIsMongoConnected()) {
      const deleted = await Service.findOneAndDelete({ id });
      if (!deleted) {
        return res.status(404).json({ error: 'सेवा सापडली नाही.' });
      }
      return res.json({ success: true, message: 'सेवा यशस्वीरीत्या हटवली गेली.' });
    } else {
      const index = memoryStore.services.findIndex(s => s.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'सेवा सापडली नाही.' });
      }
      memoryStore.services.splice(index, 1);
      return res.json({ success: true, message: 'सेवा यशस्वीरीत्या हटवली गेली.' });
    }
  } catch (err) {
    console.error('Error deleting service:', err);
    return res.status(500).json({ error: 'सेवा हटवण्यात अडचण आली.' });
  }
});

// ------------------------------------------------------------------
// FRONTEND STATIC BUILD & SPA ROUTER HANDLER
// ------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(distIndex, (err) => {
    if (err) {
      res.status(200).send('Login Computer Centre API running. Build static files with `npm run build`.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
