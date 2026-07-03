import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAP7AKr2yhYUMbThPwLUTmqie6oBR0QbGA",
  authDomain: "mita-reservation.firebaseapp.com",
  projectId: "mita-reservation",
  storageBucket: "mita-reservation.firebasestorage.app",
  messagingSenderId: "639687997836",
  appId: "1:639687997836:web:5ebcce3acc84f9aaa3bea9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginButton").addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("ログイン成功");

    location.href = "dashboard.html";

  } catch (error) {

    alert("メールアドレスまたはパスワードが違います");

  }

});