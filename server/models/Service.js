import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  marathiName: { type: String, required: true },
  englishName: { type: String, required: true },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  icon: { type: String, default: "FileText" },
  shortDescription: { type: String, default: "" },
  purpose: { type: String, default: "" },
  documents: [{ type: String }],
  keywords: [{ type: String }],
  availabilityMessage: { type: String, default: "सेवेची सध्याची उपलब्धता जाणून घेण्यासाठी आमच्याशी संपर्क साधा." },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
