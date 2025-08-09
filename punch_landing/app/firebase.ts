import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0kT0msgHMrnF-4wMTEhAry9v9ESHL5lc",
  authDomain: "punch-c1409.firebaseapp.com",
  projectId: "punch-c1409",
  storageBucket: "punch-c1409.firebasestorage.app",
  messagingSenderId: "400466785193",
  appId: "1:400466785193:web:7b40bbe5f82ddbccf20ab8",
  measurementId: "G-B8NDKDG8VP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 