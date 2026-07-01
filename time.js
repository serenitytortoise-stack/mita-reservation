const type = localStorage.getItem("reservationType");

const container = document.getElementById("timeList");

let interval = 10;

if(type==="first"){
    interval=40;
}

for(let h=11;h<20;h++){

    for(let m=0;m<60;m+=interval){

        if(h===19 && m>20) break;

        const btn=document.createElement("button");

        btn.textContent=
        String(h).padStart(2,"0")+":"+
        String(m).padStart(2,"0");

        btn.style.margin="5px";

        btn.onclick=function(){

            localStorage.setItem("reservationTime",btn.textContent);

            location.href="patient.html";
        }

        container.appendChild(btn);

    }

}