function savePatient(){

const name=document.getElementById("name").value;
const tel=document.getElementById("tel").value;
const mail=document.getElementById("mail").value;

if(name===""){
    alert("お名前を入力してください");
    return;
}

const reservation = {
    type: localStorage.getItem("reservationType"),
    date: localStorage.getItem("reservationDate"),
    time: localStorage.getItem("reservationTime"),
    name: name,
    tel: tel,
    mail: mail
};

localStorage.setItem("latestReservation", JSON.stringify(reservation));

location.href="complete.html";

}