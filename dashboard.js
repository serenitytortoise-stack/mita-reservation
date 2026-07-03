import { db } from "./firebase.js";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
const count = document.getElementById("count");
const list = document.getElementById("reservationList");

function loadReservations() {
  onSnapshot(collection(db, "reservations"), (snapshot) => {
    count.textContent = snapshot.size + "件";

    if (snapshot.empty) {
      list.innerHTML = "予約はありません";
      return;
    }

    let html = "";

    snapshot.forEach((document) => {
      const r = document.data();
      const typeName = r.type === "first" ? "初診" : "再診";

      html += `
        <div style="border-bottom:1px solid #ccc;padding:15px;">
          <h3>${r.date} ${r.time}</h3>
          <p>予約種別：${typeName}</p>
          <p>患者名：${r.name}</p>
          <p>電話：${r.tel}</p>
          <p>メール：${r.mail}</p>
          <button onclick="deleteReservation('${document.id}')">削除</button>
        </div>
      `;
    });

    list.innerHTML = html;
  });
}

window.deleteReservation = async function(id) {
  const ok = confirm("この予約を削除しますか？");

  if (!ok) {
    return;
  }

  await deleteDoc(doc(db, "reservations", id));

  alert("削除しました");

  loadReservations();
};

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadReservations();
  } else {
    alert("ログインしてください");
    location.href = "login.html";
  }
});
document.getElementById("logoutButton").addEventListener("click", async () => {
  const auth = getAuth();
  await signOut(auth);
  alert("ログアウトしました");
  location.href = "login.html";
});