import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

async function checkDate() {
  const dateInput = document.getElementById("date").value;

  if (dateInput === "") {
    alert("日付を選択してください");
    return;
  }

  const closedDates = [];

  const snapshot = await getDocs(collection(db, "closedDates"));

  snapshot.forEach((doc) => {
    closedDates.push(doc.data().date);
  });

  if (closedDates.includes(dateInput)) {
    alert("この日は休診日です。別の日を選択してください。");
    return;
  }

  const selectedDate = new Date(dateInput);
  const day = selectedDate.getDay();

  if (day !== 0 && day !== 3) {
    alert("予約できるのは水曜日・日曜日のみです。");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneMonthLater = new Date();
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  oneMonthLater.setHours(0, 0, 0, 0);

  if (selectedDate < today || selectedDate > oneMonthLater) {
    alert("予約は本日から1か月先までです。");
    return;
  }

  localStorage.setItem("reservationDate", dateInput);
  location.href = "time.html";
}

window.checkDate = checkDate;