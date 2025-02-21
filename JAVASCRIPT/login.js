document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos
  const modal = document.getElementById("modalOverlay");
  const openModalButton = document.querySelector(".login-btn");
  const closeModalButton = document.getElementById("closeModal");
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");
  const loginForm = document.querySelector("form");

  // Ocultar el modal inmediatamente al cargar
  if (modal) {
    modal.style.display = "none";
  }

  // Verificar el estado de login
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Función para actualizar la interfaz según el estado de login
  function updateLoginInterface() {
    if (openModalButton) {
      if (localStorage.getItem("isLoggedIn") === "true") {
        // Si está logueado, mostrar botón de cerrar sesión
        openModalButton.querySelector("p b").textContent = "CERRAR SESIÓN";
        openModalButton.setAttribute("id", "logoutButton");
        // Asegurarse de que el modal esté oculto
        if (modal) {
          modal.style.display = "none";
        }
      } else {
        // Si no está logueado, mostrar botón de iniciar sesión
        openModalButton.querySelector("p b").textContent = "INICIAR SESIÓN";
        openModalButton.removeAttribute("id");
      }
    }
  }

  // Llamar a la función de actualización al cargar la página
  updateLoginInterface();

  // Event listener para el botón de login/logout
  if (openModalButton) {
    openModalButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (localStorage.getItem("isLoggedIn") !== "true") {
        // Si no está logueado, mostrar modal de login
        modal.style.display = "flex";
      } else {
        // Si está logueado, cerrar sesión
        localStorage.removeItem("isLoggedIn");
        updateLoginInterface();
      }
    });
  }

  // Cerrar el modal
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Muestra la contraseña
        togglePassword.classList.remove("bi-eye-slash"); // Quita el ícono de ojo cerrado
        togglePassword.classList.add("bi-eye"); // Agrega el ícono de ojo abierto
      } else {
        passwordInput.type = "password"; // Oculta la contraseña
        togglePassword.classList.remove("bi-eye"); // Quita el ícono de ojo abierto
        togglePassword.classList.add("bi-eye-slash"); // Agrega el ícono de ojo cerrado
      }
    });
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Manejar el envío del formulario
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Aquí deberías agregar tu lógica de autenticación
      // Simular login exitoso
      localStorage.setItem("isLoggedIn", "true");
      modal.style.display = "none";
      // Actualizar la interfaz inmediatamente
      updateLoginInterface();
    });
  }
});
