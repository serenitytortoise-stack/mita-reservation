import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const datetimeInput = document.getElementById("datetime");
const typeInput = document.getElementById("type");
const saveButton = document.getElementById("saveButton");

async function loadReservation() {
  if (!id) {
    alert("予約IDがありません");
    location.href = "dashboard.html";
    return;
  }

  const ref = doc(db, "reservations", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("予約が見つかりません");
    location.href = "dashboard.html";
    return;
  }

  const data = snap.data();

  nameInput.value = data.name || "";
  phoneInput.value = data.tel || "";
  emailInput.value = data.mail || "";
  typeInput.value = data.type || "初診";

  if (data.date && data.time) {
    datetimeInput.value = `${data.date}T${data.time}`;
  }
}

saveButton.addEventListener("click", async () => {
  const datetime = datetimeInput.value;

  if (!nameInput.value || !phoneInput.value || !emailInput.value || !datetime) {
    alert("すべて入力してください");
    return;
  }

  const [date, time] = datetime.split("T");

  const ref = doc(db, "reservations", id);

  await updateDoc(ref, {
    name: nameInput.value,
    tel: phoneInput.value,
    mail: emailInput.value,
    date: date,
    time: time,
    type: typeInput.value
  });

  alert("予約を更新しました");
  location.href = "dashboard.html";
});

loadReservation();
console.log("edit.js 読み込みOK");