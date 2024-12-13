import { navBar } from "./modules/nav";

// const url = "https://gutendex.com/books/"

navBar();
  
// this one
// search books
function bookTemplate(book) {
  const authors = book.authors?.map(author => author.name).join(", ") || "Unknown Author";
  const link = book.formats?.['text/html'] || "#";
  return `
      <div class="book">
          <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p><strong>Author(s):</strong> ${authors}</p>
          <button id="listButton">Add to List</button>
      </div>
  `;
}

// this one
function renderBook(bookList) {
  const bookContainer = document.querySelector('#popularBooks'); //change location
  console.log("Book List:", bookList); // Checking
  const html = bookList.map(book => bookTemplate(book)).join('');
  bookContainer.innerHTML = html;
}

async function getData(url) {
  const inputUrl = "https://gutendex.com/books/" + url
  try {
      console.log("Fetching URL:", inputUrl); // Checking
      const response = await fetch(inputUrl);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log("API Response Results:", json.results); // Checking
      // renderBook(json.results);
      // three book limit
      const limitedResults = json.results.slice(0, 3);
      renderBook(limitedResults);

  } catch (error) {
      console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", getData("?sort:popular"));
