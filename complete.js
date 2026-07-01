const reservation = JSON.parse(localStorage.getItem("latestReservation"));

if (reservation) {
  const typeName = reservation.type === "first" ? "初診" : "再診";

  document.getElementById("result").innerHTML = `
    <p><strong>予約内容</strong></p>
    <p>患者名：${reservation.name}</p>
    <p>予約種別：${typeName}</p>
    <p>予約日：${reservation.date}</p>
    <p>予約時間：${reservation.time}</p>
    <p style="color:green;font-size:20px;">予約ありがとうございました。</p>
  `;
} else {
  document.getElementById("result").innerHTML = `
    <p>予約情報が見つかりません。</p>
  `;
}