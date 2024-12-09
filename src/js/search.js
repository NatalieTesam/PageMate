function bookTemplate() {
    return ``
}

function renderBook(bookList) {
    const bookContainer = document.querySelector('main');
    const html = bookList.map(book => bookTemplate(book)).join('');
    bookContainer.innerHTML = html;
}

// search for author or title
function searchTitle() {
    const searchInput = document.querySelector('#author').value.toLowerCase();
    const encodedInput = encodeURIComponent(searchInput);

    console.log(encodedInput)
    `${url}?search=${encodedInput}`
  }
  
document.querySelector('#searchButton').addEventListener("click", searchTitle);  