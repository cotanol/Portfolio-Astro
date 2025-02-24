// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWI-6zTpdjrfKF-q_5jq7uGJM_lXivcYE",
  authDomain: "portfolio-contacto-6e986.firebaseapp.com",
  projectId: "portfolio-contacto-6e986",
  storageBucket: "portfolio-contacto-6e986.firebasestorage.app",
  messagingSenderId: "326588664565",
  appId: "1:326588664565:web:3af09b433b1fe677c4d3bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
