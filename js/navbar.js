const menuIcon = document.querySelector("#menu-icon");
const logo = document.querySelector("#logo")
const menu = document.querySelector("#menu")
const header = document.querySelector("#header")
const darkBtn = document.querySelector("#dark-btn");
const lightBtn = document.querySelector("#light-btn");


menuIcon.addEventListener("click", switchMenu);

darkBtn.addEventListener("click", switchBtn);

lightBtn.addEventListener("click", switchBtn);

function switchMenu() {
  
  menuIcon.classList.toggle("change-icon");
  menu.classList.toggle("show");
  document.body.classList.toggle("stop-scrolling")
}

function switchBtn() {
    lightBtn.classList.toggle("is-displayed");
    darkBtn.classList.toggle("not-displayed");
  }


window.onscroll = function (){
    
    let scroll = window.scrollY

    if(scroll >= 100){

        (function () { 
            header.classList.add('header-shadow')
        } ()) 

    } else {
        (function () { 
            header.classList.remove('header-shadow')
            
        } ()) 
    } 
}
