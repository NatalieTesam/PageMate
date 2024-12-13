
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