document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");
  const formTitle = document.getElementById("form-title");

  switchToRegister.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    formTitle.textContent = "Registro";
  });

  switchToLogin.addEventListener("click", function (event) {
    event.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formTitle.textContent = "Iniciar Sesión";
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Inicio de sesión exitoso");
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Registro exitoso");
  });
});
