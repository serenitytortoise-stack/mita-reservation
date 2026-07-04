import { db } from "./firebase.js";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const count = document.getElementById("count");
const list = document.getElementById("reservationList");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const clearSearchButton = document.getElementById("clearSearchButton");

let searchText = "";
let unsubscribe = null;

function createCalendarUrl(r) {
  const typeName = r.type === "first" ? "初診" : "再診";
  const minutes = r.type === "first" ? 40 : 10;

  const start = new Date(`${r.date}T${r.time}:00`);
  const end = new Date(start.getTime() + minutes * 60000);

  function formatDate(d) {
    return (
      d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0") +
      "T" +
      String(d.getHours()).padStart(2, "0") +
      String(d.getMinutes()).padStart(2, "0") +
      "00"
    );
  }

  const title = `${typeName} ${r.name}`;
  const details = `三田メンタルクリニック Web予約\n電話:${r.tel}\nメール:${r.mail}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(details)}&ctz=Asia/Tokyo`;
}

function loadReservations() {
  if (unsubscribe) {
    unsubscribe();
  }

  unsubscribe = onSnapshot(collection(db, "reservations"), (snapshot) => {
    let html = "";
    let displayCount = 0;

    if (snapshot.empty) {
      count.textContent = "0件";
      list.innerHTML = "予約はありません";
      return;
    }

    snapshot.forEach((document) => {
      const r = document.data();

      if (searchText !== "") {
        const keyword = searchText.toLowerCase();

        const hit =
          (r.name || "").toLowerCase().includes(keyword) ||
          (r.tel || "").toLowerCase().includes(keyword) ||
          (r.mail || "").toLowerCase().includes(keyword);

        if (!hit) {
          return;
        }
      }

      displayCount++;

      const typeName = r.type === "first" ? "初診" : "再診";

      html += `
        <div style="border-bottom:1px solid #ccc; padding:15px;">
          <h3>${r.date} ${r.time}</h3>
          <p>予約種別：${typeName}</p>
          <p>患者名：${r.name || ""}</p>
          <p>電話：${r.tel || ""}</p>
          <p>メール：${r.mail || ""}</p>
          <p>状態：${r.visited ? "来院済み" : "未来院"}</p>

          <button onclick="toggleVisited('${document.id}', ${r.visited ? "false" : "true"})">
            ${r.visited ? "未来院に戻す" : "来院済みにする"}
          </button>

          <button onclick="editReservation('${document.id}')">編集</button>

          <button onclick="deleteReservation('${document.id}')">削除</button>

          <a href="${createCalendarUrl(r)}" target="_blank">
            <button>Googleカレンダーに追加</button>
          </a>
        </div>
      `;
    });

    count.textContent = displayCount + "件";

    if (displayCount === 0) {
      list.innerHTML = "該当する予約はありません";
    } else {
      list.innerHTML = html;
    }
  });
}

window.deleteReservation = async function (id) {
  const ok = confirm("この予約を削除しますか？");

  if (!ok) {
    return;
  }

  await deleteDoc(doc(db, "reservations", id));
  alert("削除しました");
};

window.toggleVisited = async function (id, visited) {
  await updateDoc(doc(db, "reservations", id), {
    visited: visited
  });
};

window.editReservation = function (id) {
  location.href = `edit.html?id=${id}`;
};

searchButton.addEventListener("click", () => {
  searchText = searchInput.value.trim();
  loadReservations();
});

clearSearchButton.addEventListener("click", () => {
  searchText = "";
  searchInput.value = "";
  loadReservations();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchText = searchInput.value.trim();
    loadReservations();
  }
});

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
  await signOut(auth);
  alert("ログアウトしました");
  location.href = "login.html";
});