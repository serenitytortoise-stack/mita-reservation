import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const button = document.getElementById("reserveButton");

function createReservationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code.slice(0, 4) + "-" + code.slice(4);
}

button.addEventListener("click", async function () {
  alert("ボタン処理開始");

  const name = document.getElementById("name").value;
  const tel = document.getElementById("tel").value;
  const mail = document.getElementById("mail").value;

  const reservationCode = createReservationCode();

  const reservation = {
    type: localStorage.getItem("reservationType"),
    date: localStorage.getItem("reservationDate"),
    time: localStorage.getItem("reservationTime"),
    name: name,
    tel: tel,
    mail: mail,
    reservationCode: reservationCode,
    createdAt: serverTimestamp()
  };

  const slot = {
    date: reservation.date,
    time: reservation.time,
    reservationCode: reservationCode,
    createdAt: serverTimestamp()
  };

  try {
    const duplicateQuery = query(
      collection(db, "bookedSlots"),
      where("date", "==", reservation.date),
      where("time", "==", reservation.time)
    );

    const duplicateSnapshot = await getDocs(duplicateQuery);

    if (!duplicateSnapshot.empty) {
      alert("この時間はすでに予約されています。別の時間を選んでください。");
      return;
    }

    alert("Firebaseに保存します");

    await addDoc(collection(db, "reservations"), reservation);
    await addDoc(collection(db, "bookedSlots"), slot);

    alert("保存できました");

    localStorage.setItem("latestReservation", JSON.stringify(reservation));
    location.href = "complete.html";

  } catch (error) {
    alert("保存エラー：" + error.message);
  }
});