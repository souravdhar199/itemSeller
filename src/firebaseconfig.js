import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyARUHMt6SizSmZpBkcWUdIyTY14OarMXd0",
  authDomain: "itemsellerapp.firebaseapp.com",
  projectId: "itemsellerapp",
  storageBucket: "itemsellerapp.appspot.com",
  messagingSenderId: "877007439316",
  appId: "1:877007439316:web:67afadc7e38821adfbc241",
};

// Initialize Firebase

export const db = getFirestore();
