import"./global-BB3kXit1.js";import{n as r}from"./nav-nOJeYQWS.js";import{g as i}from"./bookList-BM9RcrCf.js";async function c(o){const t=await l(o);return`<div class="book">
    <img class="bookImg" src="${t.formats["image/jpeg"]}" alt="${t.title}">
    <h3>${t.title}</h3>
    <button id="listButton">Swap Lists</button>
  </div>
  `}async function e(o,t){const s=document.querySelector(t),n=(await Promise.all(o.map(async a=>await c(a)))).join("");s.innerHTML=n}async function l(o){const t="https://gutendex.com/books/"+o+"/";try{console.log("Fetching URL:",t);const s=await fetch(t);if(!s.ok)throw new Error(`Response status: ${s.status}`);const n=await s.json();return console.log("API Response Results:",n),n}catch(s){console.error(s.message)}}function m(){const o=i();e(o.saved,"#savedBooks"),e(o.read,"#readBooks")}r();document.addEventListener("DOMContentLoaded",m);
