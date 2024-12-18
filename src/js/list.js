import { navBar } from "./modules/nav";
import { getBookList, swapLists } from "./modules/bookList";

const myList = {saved: [1, 2, 3], read: [1, 2, 3]}

async function bookTemplate(bookId) {
  const book = await getData(bookId);
  // console.log("book:", book);
  return `<div class="book" data-id="${bookId}" data-category="saved">
    <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
    <h3>${book.title}</h3>
    <a href="book.html?bookId=${book.id}">More Info</a>
    <button class="swapButton" id="listButton${book.id}" bookId=${book.id}>Swap Lists</button>
    
  </div>
  `;
}

async function renderBooks(bookList, location) {
  const bookContainer = document.querySelector(location); //change location
  // console.log("Book List:", bookList); // Checking
  const html = (await Promise.all(bookList.map(async bookId => await bookTemplate(bookId)))).join("");
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

document.querySelector('#savedBooks').addEventListener('click', (e) => {
    if (e.target.classList.contains('swapButton')) {
        const bookId = e.target.id.replace('listButton', ''); // Extract the book ID
        swapLists(bookId, "saved");
    } else if (e.target.classList.contains('removeButton')) {
        const bookId = e.target.id.replace('listButton', ''); // Extract the book ID
        removeBook(bookId, "saved");
    }
});

document.querySelector('#readBooks').addEventListener('click', (e) => {
  if (e.target.classList.contains('swapButton')) {
      const bookId = e.target.id.replace('listButton', ''); // Extract the book ID
      swapLists(bookId, "read");
  } else if (e.target.classList.contains('removeButton')) {
      const bookId = e.target.id.replace('listButton', '')// Extract the book ID
      removeBook(bookId, "read");
  }
});

navBar();
document.addEventListener("DOMContentLoaded", () => {
  displayLists();
  
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("listButton")) {
      const bookElement = event.target.closest('.book');
      const id = bookElement.getAttribute('data-id');
      const currentCategory = bookElement.getAttribute('data-category');

      swapLists(id, currentCategory);
      displayLists();
    }
  });
});