import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const keywordInput = document.getElementById("keywordInput");
const searchReservationButton = document.getElementById("searchReservationButton");
const resultArea = document.getElementById("resultArea");

searchReservationButton.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();

  if (keyword === "") {
    alert("電話番号またはメールアドレスを入力してください");
    return;
  }

  resultArea.innerHTML = "検索中です...";

  const results = [];

  const telQuery = query(
    collection(db, "reservations"),
    where("tel", "==", keyword)
  );

  const mailQuery = query(
    collection(db, "reservations"),
    where("mail", "==", keyword)
  );

  const telSnapshot = await getDocs(telQuery);
  const mailSnapshot = await getDocs(mailQuery);

  telSnapshot.forEach((document) => {
    results.push({
      id: document.id,
      data: document.data()
    });
  });

  mailSnapshot.forEach((document) => {
    if (!results.some((r) => r.id === document.id)) {
      results.push({
        id: document.id,
        data: document.data()
      });
    }
  });

  if (results.length === 0) {
    resultArea.innerHTML = "該当する予約はありません";
    return;
  }

  let html = "";

  results.forEach((item) => {
    const r = item.data;
    const typeName = r.type === "first" ? "初診" : "再診";

    html += `
      <div style="border-bottom:1px solid #ccc; padding:15px;">
        <h3>${r.date} ${r.time}</h3>
        <p>予約種別：${typeName}</p>
        <p>お名前：${r.name || ""}</p>
        <p>電話：${r.tel || ""}</p>
        <p>メール：${r.mail || ""}</p>

        <button onclick="cancelReservation('${item.id}')">
          この予約をキャンセルする
        </button>
      </div>
    `;
  });

  resultArea.innerHTML = html;
});

window.cancelReservation = async function (id) {
  const ok = confirm("この予約をキャンセルしますか？");

  if (!ok) {
    return;
  }

  await deleteDoc(doc(db, "reservations", id));

  alert("予約をキャンセルしました");
  location.reload();
};