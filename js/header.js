const header = ()=>{
    const burger= document.getElementById("burger");
    const ul = document.querySelector('header ul');

    burger.addEventListener("click",()=>{
        ul.classList.toggle('show');
    })
}

document.addEventListener('DOMContentLoaded',header);
