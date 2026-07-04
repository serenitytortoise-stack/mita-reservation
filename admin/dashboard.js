import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const count = document.getElementById("count");

const list = document.getElementById("reservationList");

async function loadReservations() {
  const q = query(collection(db, "reservations"), orderBy("date"), orderBy("time"));
  const snapshot = await getDocs(q);

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
      <div style="border-bottom:1px solid #ddd; padding:15px 0;">
        <p><strong>${r.date} ${r.time}</strong></p>
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