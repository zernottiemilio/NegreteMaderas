// JAVASCRIPT/responsive.js
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  function openSidebar() {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
  }

  function closeSidebarMenu() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event Listeners
  hamburgerMenu.addEventListener("click", openSidebar);
  closeSidebar.addEventListener("click", closeSidebarMenu);
  sidebarOverlay.addEventListener("click", closeSidebarMenu);

  // Cerrar sidebar al hacer click en un enlace
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebarMenu);
  });

  // Cerrar sidebar en pantallas grandes
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      closeSidebarMenu();
    }
  });
});
