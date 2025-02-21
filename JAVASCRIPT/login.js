document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos
  const modal = document.getElementById("modalOverlay");
  const openModalButtons = document.querySelectorAll(".login-btn"); // Cambiado a querySelectorAll
  const closeModalButton = document.getElementById("closeModal");
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");
  const loginForm = document.querySelector("form");

  // Ocultar el modal inmediatamente al cargar
  if (modal) {
    modal.style.display = "none";
  }

  // Función para actualizar la interfaz según el estado de login
  function updateLoginInterface() {
    openModalButtons.forEach((button) => {
      // Actualizar todos los botones
      if (localStorage.getItem("isLoggedIn") === "true") {
        const textElement =
          button.querySelector("p b") || button.querySelector("span");
        if (textElement) {
          textElement.textContent = "CERRAR SESIÓN";
        }
        button.setAttribute("id", "logoutButton");
      } else {
        const textElement =
          button.querySelector("p b") || button.querySelector("span");
        if (textElement) {
          textElement.textContent = "INICIAR SESIÓN";
        }
        button.removeAttribute("id");
      }
    });
  }

  // Event listener para los botones de login/logout
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (localStorage.getItem("isLoggedIn") !== "true") {
        modal.style.display = "flex";
      } else {
        localStorage.removeItem("isLoggedIn");
        updateLoginInterface();
      }
    });
  });

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
