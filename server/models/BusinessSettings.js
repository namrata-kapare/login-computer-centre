import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema({
  businessNameMarathi: { type: String, default: "लॉगिन कॉम्प्युटर सेंटर आणि ई-सुविधा केंद्र" },
  fullBusinessNameMarathi: { type: String, default: "लॉगिन कॉम्प्युटर सेंटर आणि ऑनलाइन ई-सुविधा केंद्र" },
  businessNameEnglish: { type: String, default: "Login Computer Centre and Online E-Suvidha Kendra" },
  shortName: { type: String, default: "लॉगिन कॉम्प्युटर सेंटर" },
  subTitle: { type: String, default: "ई-सुविधा केंद्र" },
  location: { type: String, default: "जेजुरी, महाराष्ट्र" },
  address: { type: String, default: "मोरगाव रोड, कडेपठार पतसंस्थेच्या बाजूला, जेजुरी" },
  phone: { type: String, default: "9767696067" },
  phoneRaw: { type: String, default: "9767696067" },
  email: { type: String, default: "loginjejuri@gmail.com" },
  mapEmbedSrc: { type: String, default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46461.205742667335!2d74.19049654137802!3d18.269893597140612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2fd5077b59c61%3A0xdb3d0c5f1250fac5!2sLogin%20Education%20Institute!5e0!3m2!1sen!2sin!4v1789118855380!5m2!1sen!2sin" },
  directMapLink: { type: String, default: "https://maps.app.goo.gl/tNkKu6t2nnqBArcB6" },
  openingTime: { type: String, default: "सकाळी ९:००" },
  closingTime: { type: String, default: "रात्री ८:००" },
  todayTimingText: { type: String, default: "सकाळी ९:०० ते रात्री ८:००" },
  weekdaysTitle: { type: String, default: "सोमवार ते शनिवार" },
  sundayTitle: { type: String, default: "रविवार" },
  sundayTime: { type: String, default: "आवश्यकतेनुसार" },
  specialNotice: { type: String, default: "" },
  isOpen: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

export const BusinessSettings = mongoose.models.BusinessSettings || mongoose.model('BusinessSettings', businessSettingsSchema);
