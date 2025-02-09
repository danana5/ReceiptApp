// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCZUSq1YeU7xUWpWXhiuYSxhA3H-vRThsI",
  authDomain: "receiptapp-c15b2.firebaseapp.com",
  projectId: "receiptapp-c15b2",
  storageBucket: "receiptapp-c15b2.firebasestorage.app",
  messagingSenderId: "702844991011",
  appId: "1:702844991011:web:19f19f5a9df057d715a396",
  measurementId: "G-HMFRHYV8C4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
