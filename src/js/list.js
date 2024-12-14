import { navBar } from "./modules/nav";
import { getBookList } from "./modules/bookList";

const myList = {saved: [1, 2, 3], read: [1, 2, 3]}

function bookTemplate(bookId) {
  const book = getData(bookId);
  return `
  <div class="book">
  <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
  <h3>${book.title}</h3>
  <p><strong>Author(s):</strong> ${authors}</p>
  <button id="listButton">Swap Lists</button>
  </div>
  `;
}

function renderBooks(bookList, location) {
  const bookContainer = document.querySelector(location); //change location
  console.log("Book List:", bookList); // Checking
  const html = bookList.map(bookId => bookTemplate(bookId)).join('');
  bookContainer.innerHTML = html;
}

async function getData(url) {
  const inputUrl = "https://gutendex.com/books/" + url;
  try {
    console.log("Fetching URL:", inputUrl); // Checking
    const response = await fetch(inputUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("API Response Results:", json.results); // Checking
    return json.results;
  } catch (error) {
    console.error(error.message);
  }
}

function displayLists() {
  const bookList = myList;
  // const bookList = getBookList();
  renderBooks(bookList.saved, "#savedBooks");
  renderBooks(bookList.read, "readBooks");
}

navBar();
document.addEventListener("DOMContentLoaded", displayLists());



