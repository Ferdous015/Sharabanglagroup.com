import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCkqRnXfhGTZeD7_JJ1cZkFadO8tgri8M",
  authDomain: "sharabangla-group-website.firebaseapp.com",
  projectId: "sharabangla-group-website",
  storageBucket: "sharabangla-group-website.firebasestorage.app",
  messagingSenderId: "96338248011",
  appId: "1:96338248011:web:d530558acf9f2e340668ce"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
