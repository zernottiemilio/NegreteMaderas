document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar elementos
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  // Función para abrir el sidebar
  function openSidebar() {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    console.log("Sidebar abierto"); // Debug
  }

  // Función para cerrar el sidebar
  function closeSidebarMenu() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restaura el scroll
    console.log("Sidebar cerrado"); // Debug
  }

  // Asignar event listeners
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

  // Debug: Verificar que los elementos existan
  console.log("Hamburger menu:", hamburgerMenu);
  console.log("Sidebar:", sidebar);
  console.log("Close button:", closeSidebar);
  console.log("Overlay:", sidebarOverlay);
  console.log("Nav links:", sidebarLinks.length);
});
