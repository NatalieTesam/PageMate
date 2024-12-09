const url = "https://gutendex.com/books/"



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
    if (searchInput.includes(" ")) {
        const encodedInput = encodeURIComponent(searchInput);
        getData(encodedInput);
    } else {
        getData(searchInput);
    }


    // ${url}?search=${encodedInput}
  }

  async function getData(input) {
    try {
        // const inputUrl = `${url}?search=${input}`;
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


  
document.querySelector('#searchButton').addEventListener("click", searchTitle);  