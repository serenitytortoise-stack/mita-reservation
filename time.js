import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const type = localStorage.getItem("reservationType");
const date = localStorage.getItem("reservationDate");
const container = document.getElementById("timeList");

function timeToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTime(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return (
    String(hour).padStart(2, "0") +
    ":" +
    String(minute).padStart(2, "0")
  );
}

async function loadTimes() {
  const reservedTimes = [];

  let startTime = "11:00";
  let endTime = "19:20";
  let interval = 10;

  const normalScheduleRef = doc(db, "settings", "schedule");
  const normalScheduleSnapshot = await getDoc(normalScheduleRef);

  if (normalScheduleSnapshot.exists()) {
    const schedule = normalScheduleSnapshot.data();

    startTime = schedule.start || "11:00";
    endTime = schedule.end || "19:20";
    interval = Number(schedule.interval) || 10;
  }

  const specialScheduleRef = doc(db, "specialSchedules", date);
  const specialScheduleSnapshot = await getDoc(specialScheduleRef);

  if (specialScheduleSnapshot.exists()) {
    const special = specialScheduleSnapshot.data();

    startTime = special.start || startTime;
    endTime = special.end || endTime;
    interval = Number(special.interval) || interval;
  }

  const q = query(
    collection(db, "bookedSlots"),
    where("date", "==", date)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    reservedTimes.push(data.time);
  });

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  for (let current = startMinutes; current <= endMinutes; current += interval) {
    const timeText = minutesToTime(current);

    const btn = document.createElement("button");
    btn.textContent = timeText;
    btn.style.margin = "5px";

    if (reservedTimes.includes(timeText)) {
      btn.textContent = timeText + " 予約済み";
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    } else {
      btn.onclick = function () {
        localStorage.setItem("reservationTime", timeText);
        location.href = "patient.html";
      };
    }

    container.appendChild(btn);
  }
}

loadTimes();