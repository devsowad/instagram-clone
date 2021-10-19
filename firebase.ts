import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'instagram-clone-b8465.firebaseapp.com',
  projectId: 'instagram-clone-b8465',
  storageBucket: 'instagram-clone-b8465.appspot.com',
  messagingSenderId: '792843989841',
  appId: process.env.FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
