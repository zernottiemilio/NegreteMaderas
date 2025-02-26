document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modalOverlay");
  const openModalButtons = document.querySelectorAll(".login-btn");
  const closeModalButton = document.getElementById("closeModal");
  const togglePassword = document.querySelector(".toggle-password");
  const loginForm = document.querySelector(".modal-content form");
  const forgotPasswordLink = document.querySelector(".forgot-password");

  if (modal) modal.style.display = "none";

  // Crear el elemento de notificación y agregarlo al modal
  const modalContent = document.querySelector(".modal-content");
  if (modalContent) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.id = "notification";
    notification.innerHTML =
      '<span id="notification-message"></span><span class="notification-close">&times;</span>';

    // Insertar después del h2 (título)
    const title = modalContent.querySelector("h2");
    if (title && title.nextSibling) {
      modalContent.insertBefore(notification, title.nextSibling);
    } else {
      modalContent.insertBefore(notification, modalContent.firstChild);
    }

    // Agregar evento para cerrar la notificación
    const closeNotification = notification.querySelector(".notification-close");
    if (closeNotification) {
      closeNotification.addEventListener("click", function () {
        hideNotification();
      });
    }
  }

  function showNotification(message, type = "error") {
    const notification = document.getElementById("notification");
    const messageElement = document.getElementById("notification-message");

    if (notification && messageElement) {
      messageElement.textContent = message;
      notification.className = "notification notification-" + type;
      notification.style.display = "block";

      if (type === "error") {
        // Agregar animación de shake al modal
        const modalContent = document.querySelector(".modal-content");
        modalContent.classList.add("shake");
        setTimeout(() => {
          modalContent.classList.remove("shake");
        }, 600);
      }

      // Auto-ocultar después de 5 segundos
      setTimeout(() => {
        hideNotification();
      }, 5000);
    }
  }

  function hideNotification() {
    const notification = document.getElementById("notification");
    if (notification) {
      notification.style.display = "none";
    }
  }

  // Exponer la función a la ventana para usarla en el script de Firebase
  window.showNotification = showNotification;
  window.hideNotification = hideNotification;

  let authInitialized = false;

  function updateLoginInterface(isLoggedIn) {
    console.log("Estado de sesión:", isLoggedIn ? "Conectado" : "No conectado");

    openModalButtons.forEach((button) => {
      const textElement =
        button.querySelector("b") || button.querySelector("span");
      if (textElement)
        textElement.textContent = isLoggedIn ? "MI CUENTA" : "INICIAR SESION";

      // Importante: Cambiamos la lógica de los IDs
      // En lugar de cambiar el ID del botón, usamos un atributo data-status
      if (isLoggedIn) {
        button.setAttribute("data-status", "logged-in");
      } else {
        button.setAttribute("data-status", "logged-out");
      }
    });

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "block" : "none";
  }

  window.updateLoginInterface = updateLoginInterface;

  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
      hideNotification(); // Ocultar notificación al cerrar el modal
    });
  }

  if (togglePassword) {
    const passwordInput = document.getElementById("password");
    togglePassword.addEventListener("click", function () {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
      togglePassword.classList.toggle("bi-eye-slash");
      togglePassword.classList.toggle("bi-eye");
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      hideNotification(); // Ocultar notificación al cerrar el modal
    }
  });

  // Inicialmente mostramos "INICIAR SESION" hasta que Firebase verifique
  updateLoginInterface(false);

  const firebaseScript = document.createElement("script");
  firebaseScript.type = "module";
  firebaseScript.textContent = `
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
    import {
      getAuth,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      sendPasswordResetEmail
    } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBvqbOvyxFAXUz20f5uXDazTkHC_2ZZJCg",
      authDomain: "te-maderas.firebaseapp.com",
      projectId: "te-maderas",
      storageBucket: "te-maderas.firebasestorage.app",
      messagingSenderId: "16340271369",
      appId: "1:16340271369:web:f2c057f5be7f4bfe1c93d8",
      measurementId: "G-B3MF97KHGN"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const updateLoginInterface = window.updateLoginInterface;
    const showNotification = window.showNotification;

    function login(e) {
      if (e) e.preventDefault();

      // Ocultar notificación anterior si existe
      if (window.hideNotification) window.hideNotification();

      // Importante: Obtenemos el elemento cada vez que lo necesitamos
      // para asegurarnos de que estamos usando la referencia correcta
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!emailInput || !passwordInput) {
        showNotification("Elementos de email o contraseña no encontrados.", "error");
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        showNotification("Por favor, ingresa un correo y una contraseña válidos.", "error");
        return;
      }

      console.log("Intentando iniciar sesión con:", email);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario conectado:", user.email);
          localStorage.setItem("isLoggedIn", "true");
          showNotification("¡Inicio de sesión exitoso!", "success");
          setTimeout(() => {
            const modal = document.getElementById("modalOverlay");
            if (modal) modal.style.display = "none";
          }, 1000);
          updateLoginInterface(true);
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error.message);
          let mensajeError = "Ha ocurrido un error al iniciar sesión.";

          // Mensajes de error más amigables
          if (error.code === "auth/invalid-email") {
            mensajeError = "El correo electrónico no es válido.";
          } else if (error.code === "auth/user-not-found") {
            mensajeError = "No existe una cuenta con este correo.";
          } else if (error.code === "auth/wrong-password") {
            mensajeError = "La contraseña es incorrecta.";
          } else if (error.code === "auth/too-many-requests") {
            mensajeError = "Demasiados intentos fallidos. Intenta más tarde.";
          } else if (error.code === "auth/user-disabled") {
            mensajeError = "Esta cuenta ha sido deshabilitada.";
          } else if (error.code.includes("network")) {
            mensajeError = "Error de conexión. Verifica tu internet.";
          }

          showNotification(mensajeError, "error");
        });
    }

    function logout() {
      signOut(auth)
        .then(() => {
          console.log("Usuario desconectado");
          localStorage.removeItem("isLoggedIn");
          updateLoginInterface(false);
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
          showNotification("Error al cerrar sesión: " + error.message, "error");
        });
    }

    function registrar(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario registrado:", user);
          showNotification("Usuario registrado exitosamente", "success");
          localStorage.setItem("isLoggedIn", "true");
          updateLoginInterface(true);
          setTimeout(() => {
            const modal = document.getElementById("modalOverlay");
            if (modal) modal.style.display = "none";
          }, 1500);
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
          let mensajeError = "Error al registrar usuario.";

          if (error.code === "auth/email-already-in-use") {
            mensajeError = "Este correo ya está registrado.";
          } else if (error.code === "auth/invalid-email") {
            mensajeError = "El correo electrónico no es válido.";
          } else if (error.code === "auth/weak-password") {
            mensajeError = "La contraseña es demasiado débil.";
          }

          showNotification(mensajeError, "error");
        });
    }

    function recuperarContrasena() {
      const email = prompt("Introduce tu correo electrónico para recuperar tu contraseña:");
      if (email) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            showNotification("Se ha enviado un correo para restablecer tu contraseña.", "success");
          })
          .catch((error) => {
            console.error("Error al enviar correo de recuperación:", error);
            let mensajeError = "Error al enviar correo de recuperación.";

            if (error.code === "auth/invalid-email") {
              mensajeError = "El correo electrónico no es válido.";
            } else if (error.code === "auth/user-not-found") {
              mensajeError = "No existe una cuenta con este correo.";
            }

            showNotification(mensajeError, "error");
          });
      }
    }

    onAuthStateChanged(auth, (user) => {
      const isLoggedIn = user !== null;
      window.authInitialized = true;
      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
        console.log("Usuario autenticado:", user.email);
      } else {
        localStorage.removeItem("isLoggedIn");
        console.log("No hay usuario autenticado");
      }
      updateLoginInterface(isLoggedIn);
    });

    window.login = login;
    window.logout = logout;
    window.registrar = registrar;
    window.recuperarContrasena = recuperarContrasena;
  `;

  document.body.appendChild(firebaseScript);

  // Modificamos esta parte para manejar correctamente los clicks
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Verificamos el estado actual basado en localStorage
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        // Si no hay sesión, mostramos el modal de login
        if (modal) modal.style.display = "flex";
      } else {
        // Si hay sesión, cerramos la sesión
        if (window.logout) {
          window.logout();
        } else {
          localStorage.removeItem("isLoggedIn");
          updateLoginInterface(false);
        }
      }
    });
  });

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenimos el comportamiento por defecto
      console.log("Formulario enviado");

      // Aseguramos que no se active el logout si estamos en el formulario
      if (window.login) {
        window.login(e);
      } else {
        console.error("La función login no está disponible todavía");
        showNotification(
          "Error: El sistema de inicio de sesión no está listo todavía.",
          "error"
        );
      }

      // Importante: paramos la propagación del evento para que no llegue a otros listeners
      e.stopPropagation();
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Detenemos la propagación
      if (window.recuperarContrasena) {
        window.recuperarContrasena();
      }
    });
  }
});
