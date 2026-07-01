const reservation = JSON.parse(localStorage.getItem("latestReservation"));

const count = document.getElementById("count");
const list = document.getElementById("reservationList");

if (reservation) {
  count.textContent = "1件";

  const typeName = reservation.type === "first" ? "初診" : "再診";

  list.innerHTML = `
    <p><strong>${reservation.date} ${reservation.time}</strong></p>
    <p>${typeName}</p>
    <p>患者名：${reservation.name}</p>
    <p>電話：${reservation.tel}</p>
    <p>メール：${reservation.mail}</p>
  `;
} else {
  count.textContent = "0件";
  list.innerHTML = "予約はありません";
}