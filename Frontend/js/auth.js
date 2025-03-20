document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre_usuario = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(nombre_usuario.trim(), password.trim())
    
    if (nombre_usuario === "" || password === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, llena todos los campos.",
      })
    return
    }

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_usuario, password }),
    });

    const data = await response.json();

    if (response.ok) {
      Toast.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
      })
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesion",
        text: "Usuario o contraseña incorrectos.",
      })
    }})

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token"); // Obtener el token guardado
  const currentPage = window.location.pathname.split("/").pop();

  if (!token) {
    // Si no hay token, redirigir al login
    if (currentPage !== "login.html") {
      window.location.href = "login.html";
    }
    return;
  } else {
    // Si hay token, verificar si es válido con el backend
    fetch("http://localhost:3000/api/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Si el token es inválido o expiró, redirigir al login
          localStorage.removeItem("token"); // Eliminar token inválido
          window.location.href = "login.html";
        }
      })
      .catch((error) => {
        console.error("Error verificando token:", error);
        window.location.href = "login.html";
      });
  }
});



// ALERTAS

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});