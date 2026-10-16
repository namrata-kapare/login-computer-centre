import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: तुमचे Firebase Web App credentials खाली दिलेल्या firebaseConfig ऑब्जेक्टमध्ये paste करा.
// (Firebase Console -> Project Overview / Settings -> General -> Your apps -> Web app config कॉपी करा)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrmfq6XiaAcG8KWhstG6vo2x-F0F6IdDY",
  authDomain: "login-computer-center.firebaseapp.com",
  projectId: "login-computer-center",
  storageBucket: "login-computer-center.firebasestorage.app",
  messagingSenderId: "104670426447",
  appId: "1:104670426447:web:a9883eb70c7f42f154c13a",
  measurementId: "G-59YJQ9GWF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export auth instance
export const auth = getAuth(app);

// Initialize Cloud Firestore and export db instance
export const db = getFirestore(app);

export default app;

