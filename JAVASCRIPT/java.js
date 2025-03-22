document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar las secciones de la página principal
  const whiteSection = document.querySelector(".white-section");
  const greenSection = document.querySelector(".green-section");
  const circles = document.querySelectorAll(".circle-icon");

  // URLs para redirección
  const whiteSectionURL = "/precios";
  const greenSectionURL = "/optimizador";
  const seccionPrivadaURL = "/HTML/seccionPrivada.html"; // URL correcta para la sección privada

  // Configuración de la sidebar
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const closeSidebarBtn = document.querySelector(".close-sidebar");
  const loginBtn = document.querySelector(".login-btn");

  // Agregar animación de pulso a los círculos al cargar la página
  if (circles.length > 0) {
    setTimeout(() => {
      circles.forEach((circle) => {
        circle.style.animation = "pulse 2s infinite";
      });
    }, 1000);
  }

  // Funcionalidad de la sidebar
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function () {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", function () {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", function () {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  // Manejar clic específicamente en el botón de inicio de sesión
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Cerrar la sidebar
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");

      // Redirigir a la sección privada después de un breve retraso
      setTimeout(() => {
        window.location.href = seccionPrivadaURL;
      }, 300);
    });
  }

  // Corregir los enlaces de la sidebar para dispositivos móviles
  const sidebarLinks = document.querySelectorAll(
    ".sidebar-nav a:not(.login-btn)"
  );
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevenir comportamiento predeterminado
      e.preventDefault();

      // Obtener la URL del enlace
      const href = this.getAttribute("href");

      // Cerrar la sidebar antes de navegar
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");

      // Navegar después de un pequeño retraso para permitir la animación de cierre
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // Eventos para redireccionar al hacer clic en las secciones principales
  if (whiteSection) {
    whiteSection.addEventListener("click", function () {
      // Animación antes de redireccionar
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        window.location.href = whiteSectionURL;
      }, 300);
    });

    whiteSection.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  }

  if (greenSection) {
    greenSection.addEventListener("click", function () {
      // Animación antes de redireccionar
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        window.location.href = greenSectionURL;
      }, 300);
    });

    greenSection.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  }
});
