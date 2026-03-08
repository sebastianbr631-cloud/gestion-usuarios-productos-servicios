// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUsuarioActual }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Usuarios simulados
  const usuariosSimulados = [
    { email: 'admin@gmail.com', password: 'admin123', rol: 'admin123' },

  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const usuario = usuariosSimulados.find(
      u => u.email === email && u.password === password
    );

    if (!usuario) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    // Guardamos el usuario logueado con su rol
    setUsuarioActual(usuario);
    navigate('/'); // Redirige a la página de Usuarios
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h3 className="text-center mb-3">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        <div className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          <p>Usuarios de prueba:</p>
          <p>Admin: admin@gmail.com / admin123</p>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;