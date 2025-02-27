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

  // NUEVO: Crear modal para recuperación de contraseña
  const createPasswordResetModal = () => {
    // Verificar si ya existe para no crear duplicados
    if (document.getElementById("passwordResetModal"))
      return document.getElementById("passwordResetModal");

    const resetModal = document.createElement("div");
    resetModal.className = "modal-overlay";
    resetModal.id = "passwordResetModal";
    resetModal.style.display = "none";

    resetModal.innerHTML = `
      <div class="modal-content password-reset-modal">
        <span class="close-modal" id="closeResetModal">&times;</span>
        <h2>Recuperar Contraseña</h2>
        <div class="notification" id="reset-notification" style="display: none;">
          <span id="reset-notification-message"></span>
          <span class="notification-close">&times;</span>
        </div>
        <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
        <form id="passwordResetForm">
          <div class="form-group">
            <label for="resetEmail">Correo Electrónico</label>
            <input type="email" id="resetEmail" required placeholder="ejemplo@correo.com">
          </div>
          <button type="submit" class="btn-primary">Enviar</button>
        </form>
      </div>
    `;

    document.body.appendChild(resetModal);

    // Evento para cerrar el modal
    const closeButton = resetModal.querySelector("#closeResetModal");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        resetModal.style.display = "none";
      });
    }

    // Evento para cerrar al hacer clic fuera
    resetModal.addEventListener("click", function (event) {
      if (event.target === resetModal) {
        resetModal.style.display = "none";
      }
    });

    // Evento para el formulario
    const resetForm = resetModal.querySelector("#passwordResetForm");
    if (resetForm) {
      resetForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("resetEmail").value.trim();

        if (window.recuperarContrasenaConEmail) {
          window.recuperarContrasenaConEmail(email);
        }
      });
    }

    // Agregar evento para cerrar la notificación
    const closeResetNotification = resetModal.querySelector(
      ".notification-close"
    );
    if (closeResetNotification) {
      closeResetNotification.addEventListener("click", function () {
        hideResetNotification();
      });
    }

    return resetModal;
  };

  // Función para mostrar notificación en el modal de reset
  function showResetNotification(message, type = "error") {
    const notification = document.getElementById("reset-notification");
    const messageElement = document.getElementById(
      "reset-notification-message"
    );

    if (notification && messageElement) {
      messageElement.textContent = message;
      notification.className = "notification notification-" + type;
      notification.style.display = "block";

      if (type === "error") {
        // Agregar animación de shake al modal
        const modalContent = document.querySelector(".password-reset-modal");
        modalContent.classList.add("shake");
        setTimeout(() => {
          modalContent.classList.remove("shake");
        }, 600);
      }

      // Auto-ocultar después de 5 segundos
      setTimeout(() => {
        hideResetNotification();
      }, 5000);
    }
  }

  function hideResetNotification() {
    const notification = document.getElementById("reset-notification");
    if (notification) {
      notification.style.display = "none";
    }
  }

  // MODIFICADO: Función para crear el sidebar para dispositivos móviles
  const createSidebar = () => {
    // Verificar si ya existe para no crear duplicados
    if (document.getElementById("mobile-sidebar"))
      return document.getElementById("mobile-sidebar");

    const sidebar = document.createElement("div");
    sidebar.className = "mobile-sidebar";
    sidebar.id = "mobile-sidebar";
    sidebar.style.display = "none";

    // Crear la estructura del sidebar
    sidebar.innerHTML = `
      <div class="sidebar-content">
        <div class="sidebar-header">
          <span class="close-sidebar">&times;</span>
          <h3>Menú</h3>
        </div>
        <div class="sidebar-menu">
          <a href="/HTML/rrhh.html" class="sidebar-option">Sección Privada</a>
          <a href="#" class="sidebar-option logout-option">Cerrar Sesión</a>
        </div>
      </div>
    `;

    document.body.appendChild(sidebar);

    // Evento para cerrar el sidebar
    const closeButton = sidebar.querySelector(".close-sidebar");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        hideSidebar();
      });
    }

    // Evento para el fondo oscuro (cierra al hacer clic fuera)
    sidebar.addEventListener("click", function (event) {
      if (event.target === sidebar) {
        hideSidebar();
      }
    });

    // Agregar evento para la opción de cerrar sesión
    const logoutOption = sidebar.querySelector(".logout-option");
    if (logoutOption) {
      logoutOption.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.logout) {
          window.logout();
        }
        hideSidebar();
      });
    }

    return sidebar;
  };

  // Función para mostrar el sidebar
  const showSidebar = () => {
    const sidebar = createSidebar();
    sidebar.style.display = "block";
    // Añadir clase al body para prevenir scroll
    document.body.classList.add("sidebar-open");
  };

  // Función para ocultar el sidebar
  const hideSidebar = () => {
    const sidebar = document.getElementById("mobile-sidebar");
    if (sidebar) {
      sidebar.style.display = "none";
      // Remover clase del body
      document.body.classList.remove("sidebar-open");
    }
  };

  // MODIFICADO: Crear el menú desplegable para pantallas grandes
  const createAccountMenu = () => {
    // Verificar si ya existe para no crear duplicados
    if (document.getElementById("account-dropdown"))
      return document.getElementById("account-dropdown");

    const accountMenu = document.createElement("div");
    accountMenu.className = "account-dropdown";
    accountMenu.id = "account-dropdown";

    // Agregar la opción de Sección Privada
    const privateSection = document.createElement("a");
    privateSection.href = "/HTML/rrhh.html";
    privateSection.className = "private-section-option";
    privateSection.innerHTML = "Sección Privada";

    // Agregar la opción de Cerrar Sesión
    const logoutOption = document.createElement("a");
    logoutOption.href = "#";
    logoutOption.className = "logout-option";
    logoutOption.innerHTML = "Cerrar Sesión";

    logoutOption.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.logout) {
        window.logout();
      }
      hideAccountMenu();
    });

    // Agregar las opciones al menú
    accountMenu.appendChild(privateSection);
    accountMenu.appendChild(logoutOption);
    document.body.appendChild(accountMenu);

    return accountMenu;
  };

  // MODIFICADO: Función para mostrar el menú de cuenta según el tamaño de pantalla
  const handleAccountMenu = (button) => {
    // Determinar si estamos en dispositivo móvil (menos de 1024px)
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // En móviles mostramos el sidebar
      showSidebar();
    } else {
      // En escritorio mostramos el menú desplegable
      showAccountMenu(button);
    }
  };

  // Mostrar el menú desplegable para escritorio
  const showAccountMenu = (button) => {
    // Crear el menú si no existe
    const menu = createAccountMenu();

    const buttonRect = button.getBoundingClientRect();
    const menuTop = buttonRect.bottom + window.scrollY;
    const menuLeft = buttonRect.left + window.scrollX;

    menu.style.position = "absolute";
    menu.style.top = menuTop + "px";
    menu.style.left = menuLeft + "px";

    // Comprobar si el menú está visible o no
    if (menu.style.display === "block") {
      // Si ya está visible, lo ocultamos
      menu.style.display = "none";
    } else {
      // Si está oculto, lo mostramos
      menu.style.display = "block";
    }
  };

  // Ocultar el menú desplegable
  const hideAccountMenu = () => {
    const menu = document.getElementById("account-dropdown");
    if (menu) {
      menu.style.display = "none";
    }
  };

  // NUEVO: Añadir evento para detectar cambios en el tamaño de la ventana
  window.addEventListener("resize", function () {
    // Si estamos en móvil y el menú desplegable está abierto, lo cerramos
    if (window.innerWidth < 1024) {
      hideAccountMenu();
    } else {
      // Si estamos en escritorio y el sidebar está abierto, lo cerramos
      hideSidebar();
    }
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("account-dropdown");
    const loginButtons = Array.from(document.querySelectorAll(".login-btn"));
    const clickedOnButton = loginButtons.some((btn) => btn.contains(e.target));

    // Cerrar el menú si:
    // 1. El menú existe y está visible
    // 2. El clic NO fue en el menú
    // 3. El clic NO fue en un botón de login
    if (
      menu &&
      menu.style.display === "block" &&
      !menu.contains(e.target) &&
      !clickedOnButton
    ) {
      hideAccountMenu();
    }
  });

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

  // Exponer funciones a la ventana
  window.showNotification = showNotification;
  window.hideNotification = hideNotification;
  window.showResetNotification = showResetNotification;
  window.hideResetNotification = hideResetNotification;
  window.createPasswordResetModal = createPasswordResetModal;
  window.showSidebar = showSidebar;
  window.hideSidebar = hideSidebar;

  let authInitialized = false;

  function updateLoginInterface(isLoggedIn) {
    console.log("Estado de sesión:", isLoggedIn ? "Conectado" : "No conectado");

    openModalButtons.forEach((button) => {
      const textElement =
        button.querySelector("b") || button.querySelector("span");
      if (textElement)
        textElement.textContent = isLoggedIn ? "MI CUENTA" : "INICIAR SESION";

      // Cambiamos la lógica de los IDs usando un atributo data-status
      if (isLoggedIn) {
        button.setAttribute("data-status", "logged-in");
      } else {
        button.setAttribute("data-status", "logged-out");
      }
    });
  }

  window.updateLoginInterface = updateLoginInterface;

  // Mostramos inicialmente la interfaz según lo que indica localStorage
  const initialLoggedInState = localStorage.getItem("isLoggedIn") === "true";
  updateLoginInterface(initialLoggedInState);

  // Bandera para saber si Firebase ya verificó el estado real
  let firebaseVerified = false;

  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
      hideNotification();
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
      hideNotification();
    }
  });

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
    const showResetNotification = window.showResetNotification;

    function login(e) {
      if (e) e.preventDefault();

      // Ocultar notificación anterior si existe
      if (window.hideNotification) window.hideNotification();

      // Obtenemos el elemento cada vez que lo necesitamos
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

    // Nueva función para recuperar contraseña con correo desde el modal personalizado
    function recuperarContrasenaConEmail(email) {
      if (!email) {
        showResetNotification("Por favor, ingresa un correo electrónico válido.", "error");
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          showResetNotification("Se ha enviado un correo para restablecer tu contraseña.", "success");
          // Cerrar el modal después de 3 segundos
          setTimeout(() => {
            const resetModal = document.getElementById("passwordResetModal");
            if (resetModal) resetModal.style.display = "none";
          }, 3000);
        })
        .catch((error) => {
          console.error("Error al enviar correo de recuperación:", error);
          let mensajeError = "Error al enviar correo de recuperación.";

          if (error.code === "auth/invalid-email") {
            mensajeError = "El correo electrónico no es válido.";
          } else if (error.code === "auth/user-not-found") {
            mensajeError = "No existe una cuenta con este correo.";
          }

          showResetNotification(mensajeError, "error");
        });
    }

    // Mantener la función original para compatibilidad
    function recuperarContrasena() {
      // En lugar de usar prompt, mostramos nuestro modal personalizado
      const resetModal = window.createPasswordResetModal();
      resetModal.style.display = "flex";
    }

    // Marcamos cuando Firebase ya verificó el estado
    onAuthStateChanged(auth, (user) => {
      const isLoggedIn = user !== null;
      window.firebaseVerified = true;
      window.authInitialized = true;

      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
        console.log("Usuario autenticado:", user.email);
      } else {
        localStorage.removeItem("isLoggedIn");
        console.log("No hay usuario autenticado");
      }

      // Actualizamos la interfaz con el estado real verificado por Firebase
      updateLoginInterface(isLoggedIn);
    });

    window.login = login;
    window.logout = logout;
    window.registrar = registrar;
    window.recuperarContrasena = recuperarContrasena;
    window.recuperarContrasenaConEmail = recuperarContrasenaConEmail;
  `;

  document.body.appendChild(firebaseScript);

  // MODIFICADO: Manejo del clic en los botones de login
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // Prevenir comportamiento predeterminado
      event.preventDefault();

      // Detener la propagación para que no se cierre inmediatamente
      event.stopPropagation();

      // Si Firebase ya verificó, usamos ese estado, si no, usamos localStorage como respaldo
      const isFirebaseVerified = window.firebaseVerified === true;

      // Determinamos si el usuario está logueado basado en la mejor información disponible
      let isLoggedIn;
      if (isFirebaseVerified) {
        // Si Firebase ya verificó, usar el atributo data-status que fue establecido por onAuthStateChanged
        isLoggedIn = button.getAttribute("data-status") === "logged-in";
      } else {
        // Si Firebase aún no ha verificado, usamos localStorage como respaldo temporal
        isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      }

      if (!isLoggedIn) {
        // Si no hay sesión, mostramos el modal de login
        if (modal) modal.style.display = "flex";
      } else {
        // MODIFICADO: Usamos la función responsiva para mostrar el menú
        handleAccountMenu(button);
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
