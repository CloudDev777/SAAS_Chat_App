// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_API_KEY),
  authDomain: "portfolio-saas-chat-app.firebaseapp.com",
  projectId: "portfolio-saas-chat-app",
  storageBucket: "portfolio-saas-chat-app.appspot.com",
  messagingSenderId: "835927612964",
  appId: "1:835927612964:web:de5d54db78fb8c62c902b1",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
