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

button.addEventListener("click", async function () {
  alert("ボタン処理開始");

  const name = document.getElementById("name").value;
  const tel = document.getElementById("tel").value;
  const mail = document.getElementById("mail").value;

  const reservation = {
    type: localStorage.getItem("reservationType"),
    date: localStorage.getItem("reservationDate"),
    time: localStorage.getItem("reservationTime"),
    name: name,
    tel: tel,
    mail: mail,
    createdAt: serverTimestamp()
  };

  try {
    const duplicateQuery = query(
  collection(db, "reservations"),
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
    alert("保存できました");

    localStorage.setItem("latestReservation", JSON.stringify(reservation));
    location.href = "complete.html";
  } catch (error) {
    alert("保存エラー：" + error.message);
  }
});