import { addBook } from "./modules/bookList";

const url = "https://gutendex.com/books/";
let currentSearchUrl = "";
let currentPage = 1;

// adding/removing class for nav transition
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu");
    const navMenu = document.querySelector(".global-nav-toggle");
  
    menuButton.addEventListener("click", () => {
      // Toggle the "show" class on the navigation menu
      navMenu.classList.toggle("show");
  
      const isExpanded = navMenu.classList.contains("show");
      menuButton.setAttribute("aria-expanded", isExpanded);
    });
  });
    
// this one
// search books
function bookTemplate(book) {
    const authors = book.authors?.map(author => author.name).join(", ") || "Unknown Author";
    const link = book.formats?.['text/html'] || "#";
    return `
        <div class="book" bookId="${book.id}">
            <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p><strong>Author(s):</strong> ${authors}</p>
            <div class="buttons">
                <button class="addButton" id="listButton${book.id}" bookId="${book.id}">Add to List</button>
                <a href="${link}" target="_blank">Read Book</a>
            </div>
        </div>
    `;
}

// this one
function renderBook(bookList) {
    const bookContainer = document.querySelector('.bookList');
    console.log("Book List:", bookList); // Checking
    const html = bookList.map(book => bookTemplate(book)).join('');
    bookContainer.innerHTML = html;
}

// this one
async function getData(inputUrl, page = 1) {
    currentSearchUrl = inputUrl
    try {
        console.log("Fetching URL:", `${inputUrl}&page=${page}`); // Checking
        const response = await fetch(`${inputUrl}&page=${page}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("API Response Results:", json.results); // Checking
        renderBook(json.results);
        // three book limit
        // const limitedResults = json.results.slice(0, 3);
        // renderBook(limitedResults);

    } catch (error) {
        console.error(error.message);
    }
}

function chooseSearch() {
  const titleOrAuthor = document.querySelector('#author').value.trim();
  const topic = document.querySelector('#topic').value.trim();
  const year = document.querySelector('#year').value.trim();
  const language = document.querySelector('#language').value;

  if (titleOrAuthor) {
      searchTitle(titleOrAuthor);
  } else if (topic) {
      searchTopic(topic);
  } else if (year) {
      searchYear(year);
  } else if (language && language !== "select") {
      searchLanguage(language);
  } else {
      console.error("No search criteria provided.");
      alert("Please enter at least one search criteria!");
  }
}

// this one
function searchTitle() {
    const searchInput = document.querySelector('#author').value.trim().toLowerCase();
    const encodedInput = encodeURIComponent(searchInput);
    const inputUrl = `${url}?search=${encodedInput}`;
    getData(inputUrl);
}

function searchTopic() {
  const searchInput = document.querySelector('#topic').value.trim().toLowerCase();
  const encodedInput = encodeURIComponent(searchInput);
  const inputUrl = `${url}?topic=${encodedInput}`;
  getData(inputUrl);
}

function searchYear() {
  const searchInput = document.querySelector('#year').value.trim().toLowerCase();
  const encodedInput = encodeURIComponent(searchInput);
  const inputUrl = `${url}?author_year_start=${encodedInput}`;
  getData(inputUrl);
}

function searchLanguage() {
  const searchInput = document.querySelector('#language').value.trim().toLowerCase();
  const encodedInput = encodeURIComponent(searchInput);
  const inputUrl = `${url}?languages=${encodedInput}`;
  getData(inputUrl);
}

// Function to add a book to `myList` and save to local storage
document.querySelector('.bookList').addEventListener('click', (e) => {
    if (e.target.classList.contains('addButton')) {
        const bookId = e.target.id.replace('listButton', ''); // Extract the book ID
        addBook(bookId, "saved");
        
    }
});

document.addEventListener("DOMContentLoaded", searchTitle("popular"));
document.querySelector('#searchButton').addEventListener("click", chooseSearch);
document.querySelector('#nextButton').addEventListener('click', () => {
    if (currentSearchUrl) {
        currentPage++; // add page
        getData(currentSearchUrl, currentPage); // Fetch the next page
    } else {
        alert("Please perform a search first!");
    }
});
document.querySelector('#searchButton').addEventListener('click', () => {
    currentPage = 1; // Reset to the first page for a new search
});

