import { navBar } from "./modules/nav";
import { getBookList } from "./modules/bookList";

const myList = {saved: [1, 2, 3], read: [1, 2, 3]}

async function bookTemplate(bookId) {
  const book = await getData(bookId);
  // console.log("book:", book);
  return `<div class="book">
    <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
    <h3>${book.title}</h3>
    <button id="listButton">Swap Lists</button>
  </div>
  `;
}

async function renderBooks(bookList, location) {
  const bookContainer = document.querySelector(location); //change location
  // console.log("Book List:", bookList); // Checking
  const html = (await Promise.all(bookList.map(async bookId => await bookTemplate(bookId)))).join();
  bookContainer.innerHTML = html;
}

async function getData(url) {
  const inputUrl = "https://gutendex.com/books/" + url + "/";
  try {
    console.log("Fetching URL:", inputUrl); // Checking
    const response = await fetch(inputUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("API Response Results:", json); // Checking
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function displayLists() {
  // const bookList = myList;
  const bookList = getBookList();
  renderBooks(bookList.saved, "#savedBooks");
  renderBooks(bookList.read, "#readBooks");
}

navBar();
document.addEventListener("DOMContentLoaded", displayLists);



