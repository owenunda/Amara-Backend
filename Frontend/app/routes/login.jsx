import { useState } from "react";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Correo electrónico</label>
          <input type="text" className="form-control" id="username" placeholder="Ingresa tu nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Ingresar</button>
      </form>
    </div>
  );
}
