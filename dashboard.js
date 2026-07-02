import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const count = document.getElementById("count");
const list = document.getElementById("reservationList");

async function loadReservations() {
  const snapshot = await getDocs(collection(db, "reservations"));

  count.textContent = snapshot.size + "件";

  if (snapshot.empty) {
    list.innerHTML = "予約はありません";
    return;
  }

  let html = "";

  snapshot.forEach((doc) => {
    const r = doc.data();
    const typeName = r.type === "first" ? "初診" : "再診";

    html += `
      <div style="border-bottom:1px solid #ccc;padding:15px;">
        <h3>${r.date} ${r.time}</h3>
        <p>予約種別：${typeName}</p>
        <p>患者名：${r.name}</p>
        <p>電話：${r.tel}</p>
        <p>メール：${r.mail}</p>
      </div>
    `;
  });

  list.innerHTML = html;
}

loadReservations();