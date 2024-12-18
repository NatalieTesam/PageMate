// add this to book in booklist page 
// <a href="book.html?bookId=${book.id}"></a>

import { navBar } from "./modules/nav";

function getParam(param) {
    const paramString = window.location.search;
    const params = new URLSearchParams(paramString);
    console.log("param:", params.get(param));
    return params.get(param);
  }

  async function bookTemplate(bookId) {
    const book = await getData(bookId);
    const authors = book.authors?.map(author => author.name).join(", ") || "Unknown Author";
    const link = book.formats?.['text/html'] || "#";
    // turns the pattern information into the viewer
    return `<div class="book" bookId="${book.id}">
            <img class="bookImg" src="${book.formats['image/jpeg']}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p><strong>Author(s):</strong> ${authors}</p>
            <div class="buttons">
                <a href="${link}" target="_blank">Read Book</a>
            </div>
        </div>`;
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

  async function renderBook() {
    const bookId = getParam("bookId");
    const bookHTML = await bookTemplate(bookId);
    document.querySelector("#info").innerHTML = bookHTML;
  }

  navBar();
  document.addEventListener("DOMContentLoaded", renderBook);