// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myblog-d1747.firebaseapp.com",
  projectId: "myblog-d1747",
  storageBucket: "myblog-d1747.appspot.com",
  messagingSenderId: "792749552470",
  appId: "1:792749552470:web:466efc097971a92d87dcf7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// We export this so that we can access it somewhere else.