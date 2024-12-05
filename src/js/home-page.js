const url = "https://gutendex.com/books/"

// async function getJson(endpoint) {
//     // replace this with your actual key
//     // construct the url: baseUrl + endpoint + parameters
//     const url = baseUrl + endpoint;
//     // set the options. The important one here is the X-Api-Key
//     const options = {
//       method: "GET"
//     }
//     // make the request
//     const response = await fetch(url, options)
//     const data = await response.json()
//     console.log(data)
//     return data
//   }

  
//   getJson("books/");

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

getData();