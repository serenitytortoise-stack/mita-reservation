import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAP7AKr2yhYUMbThPwLUTmqie6oBR0QbGA",
  authDomain: "mita-reservation.firebaseapp.com",
  projectId: "mita-reservation",
  storageBucket: "mita-reservation.firebasestorage.app",
  messagingSenderId: "639687997836",
  appId: "1:639687997836:web:5ebcce3acc84f9aaa3bea9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);