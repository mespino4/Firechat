// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbKXTXA3YS2mtd-KV_vY23d-fJuKuGB78",
  authDomain: "firechat-956f1.firebaseapp.com",
  projectId: "firechat-956f1",
  storageBucket: "firechat-956f1.appspot.com",
  messagingSenderId: "710425848823",
  appId: "1:710425848823:web:7eb15d392cdac725f41cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();