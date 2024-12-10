const url = "https://gutendex.com/books/";

function bookTemplate(book) {
    const authors = book.authors?.map(author => author.name).join(", ") || "Unknown Author";
    const link = book.formats?.['text/html'] || "#";
    return `
        <div class="book">
            <h2>${book.title}</h2>
            <p><strong>Author(s):</strong> ${authors}</p>
            <a href="${link}" target="_blank">Read Book</a>
        </div>
    `;
}

function renderBook(bookList) {
    const bookContainer = document.querySelector('.bookList');
    console.log("Book List:", bookList); // Checking
    const html = bookList.map(book => bookTemplate(book)).join('');
    bookContainer.innerHTML = html;
}

async function getData(inputUrl) {
    try {
        console.log("Fetching URL:", inputUrl); // Checking
        const response = await fetch(inputUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("API Response Results:", json.results); // Checking
        renderBook(json.results);
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

function searchTitle() {
    const searchInput = document.querySelector('#author').value.trim().toLowerCase();
    const encodedInput = encodeURIComponent(searchInput);
    const inputUrl = `${url}?search=${encodedInput}`;
    getData(inputUrl);
}

function searchTopic() {
  const searchInput = document.querySelector('#author').value.trim().toLowerCase();
  const encodedInput = encodeURIComponent(searchInput);
  const inputUrl = `${url}?topics=${encodedInput}`;
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

document.addEventListener("DOMContentLoaded", searchTitle("popular"));
document.querySelector('#searchButton').addEventListener("click", chooseSearch);
