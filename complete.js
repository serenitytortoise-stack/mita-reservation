const name = localStorage.getItem("patientName");
const date = localStorage.getItem("reservationDate");
const time = localStorage.getItem("reservationTime");
const type = localStorage.getItem("reservationType");

let typeName = "再診";

if(type==="first"){
    typeName="初診";
}

document.getElementById("result").innerHTML=
`
<p><strong>予約内容</strong></p>

<p>患者名：${name}</p>

<p>予約種別：${typeName}</p>

<p>予約日：${date}</p>

<p>予約時間：${time}</p>

<p style="color:green;font-size:20px;">
予約ありがとうございました。
</p>
`;