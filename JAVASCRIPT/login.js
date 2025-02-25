document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modalOverlay");
  const openModalButtons = document.querySelectorAll(".login-btn");
  const closeModalButton = document.getElementById("closeModal");
  const togglePassword = document.querySelector(".toggle-password");
  const loginForm = document.querySelector(".modal-content form");
  const forgotPasswordLink = document.querySelector(".forgot-password");

  if (modal) modal.style.display = "none";

  let authInitialized = false;

  function updateLoginInterface(isLoggedIn) {
    console.log("Estado de sesión:", isLoggedIn ? "Conectado" : "No conectado");

    openModalButtons.forEach((button) => {
      const textElement =
        button.querySelector("b") || button.querySelector("span");
      if (textElement)
        textElement.textContent = isLoggedIn ? "MI CUENTA" : "INICIAR SESION";
      if (isLoggedIn) {
        button.setAttribute("id", "logoutButton");
      } else {
        button.removeAttribute("id");
      }
    });

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "block" : "none";
  }

  window.updateLoginInterface = updateLoginInterface;

  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
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
    }
  });

  // Verificar si hay una sesión activa almacenada localmente
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  updateLoginInterface(isLoggedIn);

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

    function login(e) {
      if (e) e.preventDefault();

      // Importante: Obtenemos el elemento cada vez que lo necesitamos
      // para asegurarnos de que estamos usando la referencia correcta
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!emailInput || !passwordInput) {
        console.error("Elementos de email o contraseña no encontrados.");
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert("Por favor, ingresa un correo y una contraseña válidos.");
        return;
      }

      console.log("Intentando iniciar sesión con:", email);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario conectado:", user.email);
          localStorage.setItem("isLoggedIn", "true");
          const modal = document.getElementById("modalOverlay");
          if (modal) modal.style.display = "none";
          updateLoginInterface(true);
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error.message);
          alert("Error de inicio de sesión: " + error.message);
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
        });
    }

    function registrar(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario registrado:", user);
          alert("Usuario registrado exitosamente");
          localStorage.setItem("isLoggedIn", "true");
          updateLoginInterface(true);
          const modal = document.getElementById("modalOverlay");
          if (modal) modal.style.display = "none";
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
          alert("Error de registro: " + error.message);
        });
    }

    function recuperarContrasena() {
      const email = prompt("Introduce tu correo electrónico para recuperar tu contraseña:");
      if (email) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert("Se ha enviado un correo para restablecer tu contraseña.");
          })
          .catch((error) => {
            console.error("Error al enviar correo de recuperación:", error);
            alert("Error: " + error.message);
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

  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (localStorage.getItem("isLoggedIn") !== "true") {
        if (modal) modal.style.display = "flex";
      } else {
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
      e.preventDefault();
      console.log("Formulario enviado");
      if (window.login) {
        window.login(e);
      } else {
        console.error("La función login no está disponible todavía");
      }
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (window.recuperarContrasena) {
        window.recuperarContrasena();
      }
    });
  }
});
