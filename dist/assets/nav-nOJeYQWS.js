function o(){document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("menu"),t=document.querySelector(".global-nav-toggle");e.addEventListener("click",()=>{t.classList.toggle("show");const n=t.classList.contains("show");e.setAttribute("aria-expanded",n)})})}export{o as n};