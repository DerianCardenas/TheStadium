const header = ()=>{
    const burger= document.getElementById("burger");
    const ul = document.querySelector('header ul');

    burger.addEventListener("click",()=>{
        console.log("menu");
        ul.classList.toggle('show');
    })
}
let title = document.getElementById("logotext");
title.addEventListener("click",()=>{
    window.location.href = "index.html";
})
document.addEventListener('DOMContentLoaded',header);