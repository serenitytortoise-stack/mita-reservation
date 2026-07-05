const reservation = JSON.parse(localStorage.getItem("latestReservation"));

if (reservation) {

  const typeName =
    reservation.type === "first" ? "初診" : "再診";

  document.getElementById("result").innerHTML = `
    <p style="font-size:24px;color:green;">
      <strong>予約ありがとうございました。</strong>
    </p>

    <hr>

    <p><strong>予約番号</strong></p>

    <h2 style="color:#0066cc;">
      ${reservation.reservationCode}
    </h2>

    <hr>

    <p><strong>予約内容</strong></p>

    <p>患者名：${reservation.name}</p>

    <p>予約種別：${typeName}</p>

    <p>予約日：${reservation.date}</p>

    <p>予約時間：${reservation.time}</p>

    <hr>

    <p style="color:red;">
      この予約番号は予約確認・キャンセルの際に必要です。<br>
      スクリーンショットを保存するか、メモしてください。
    </p>
  `;

} else {

  document.getElementById("result").innerHTML = `
    <p>予約情報が見つかりません。</p>
  `;

}