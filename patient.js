function savePatient(){

const name=document.getElementById("name").value;
const tel=document.getElementById("tel").value;
const mail=document.getElementById("mail").value;

if(name==""){
    alert("お名前を入力してください");
    return;
}

localStorage.setItem("patientName",name);
localStorage.setItem("patientTel",tel);
localStorage.setItem("patientMail",mail);

location.href="complete.html";

}