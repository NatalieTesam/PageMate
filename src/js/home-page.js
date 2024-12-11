const url = "https://gutendex.com/books/"

async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

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
  

getData();

// this one
// search books
function bookTemplate(book) {
  const authors = book.authors?.map(author => author.name).join(", ") || "Unknown Author";
  const link = book.formats?.['text/html'] || "#";
  return `
      <div class="book">
          <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
          <h2>${book.title}</h2>
          <p><strong>Author(s):</strong> ${authors}</p>
          <button id="listButton">Add to List</button>
          <a href="${link}" target="_blank">Read Book</a>
      </div>
  `;
}

// this one
function renderBook(bookList) {
  const bookContainer = document.querySelector('.bookList'); //change location
  console.log("Book List:", bookList); // Checking
  const html = bookList.map(book => bookTemplate(book)).join('');
  bookContainer.innerHTML = html;
}

// this one
function searchTitle() {
  const searchInput = document.querySelector('#author').value.trim().toLowerCase();
  const encodedInput = encodeURIComponent(searchInput);
  const inputUrl = `${url}?search=${encodedInput}`;
  getData(inputUrl);
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
      // renderBook(json.results);
      // three book limit
      const limitedResults = json.results.slice(0, 3);
      renderBook(limitedResults);

  } catch (error) {
      console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", searchTitle("popular"));
