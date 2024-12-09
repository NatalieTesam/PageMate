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