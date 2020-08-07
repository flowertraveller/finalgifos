"use strict" 
/* Activar Función Day or Night con el menú desplegable y recordar vista*/

function day(){
    theme.className='day';
    document.getElementById("img-logo").src = "./assets/gifOF_logo.png";
    localStorage.setItem("theme",'day');
}
function night(){
    theme.className='night';
    document.getElementById("img-logo").src = "./assets/gifOF_logo_dark.png";
    localStorage.setItem("theme",'night');
}
let selectedTheme = localStorage.getItem("theme");
    switch(selectedTheme){
        case 'day':{day()}
        break;
        case 'night':{night()}
        break;
    }

