import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEfdg1Yr5TAF9zZKLdxhnEBlu6hmVe-YM",
    authDomain: "movilstore-a2d16.firebaseapp.com",
    projectId: "movilstore-a2d16",
    storageBucket: "movilstore-a2d16.firebasestorage.app",
    messagingSenderId: "1076468642450",
    appId: "1:1076468642450:web:742f4b4e0ef62d6d2f2c4b"
  };

const app = initializeApp(firebaseConfig);

// Exportamos los servicios que vamos a usar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
