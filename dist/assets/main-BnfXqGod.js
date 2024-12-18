import"./global-BB3kXit1.js";import{n as r}from"./nav-nOJeYQWS.js";r();function a(t){var o,s;const n=((o=t.authors)==null?void 0:o.map(e=>e.name).join(", "))||"Unknown Author";return(s=t.formats)!=null&&s["text/html"],`
      <div class="book">
          <img class="bookImg" src="${t.formats["image/jpeg"]}" alt="${t.title}">
          <h3>${t.title}</h3>
          <p><strong>Author(s):</strong> ${n}</p>
          <button id="listButton">Add to List</button>
      </div>
  `}function c(t){const n=document.querySelector("#popularBooks");console.log("Book List:",t);const o=t.map(s=>a(s)).join("");n.innerHTML=o}async function i(t){const n="https://gutendex.com/books/"+t;try{console.log("Fetching URL:",n);const o=await fetch(n);if(!o.ok)throw new Error(`Response status: ${o.status}`);const s=await o.json();console.log("API Response Results:",s.results);const e=s.results.slice(0,3);c(e)}catch(o){console.error(o.message)}}document.addEventListener("DOMContentLoaded",i("?sort:popular"));
