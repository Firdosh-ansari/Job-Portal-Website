// firebase.config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARKNWhAMquBQE8CwJ-3h6XgRdY33HNuF0",
  authDomain: "online-job-portal-7bb89.firebaseapp.com",
  projectId: "online-job-portal-7bb89",
  storageBucket: "online-job-portal-7bb89.firebasestorage.app",
  messagingSenderId: "223363862017",
  appId: "1:223363862017:web:359060bbbffdf0c6c57a00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

//Correct way to export
export { db };
