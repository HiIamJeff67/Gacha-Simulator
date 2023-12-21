import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAmyCzqExDBWd8GxTgHGhmQSb3xIH-reO0",
    authDomain: "gacha-simulator-b66c2.firebaseapp.com",
    projectId: "gacha-simulator-b66c2",
    storageBucket: "gacha-simulator-b66c2.appspot.com",
    messagingSenderId: "248054305679",
    appId: "1:248054305679:web:589e1536ea8d1a16a271fa",
    measurementId: "G-KSBMHK9FYR"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);