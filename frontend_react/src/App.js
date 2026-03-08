// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Páginas
import LoginPage from './pages/LoginPage.jsx';
import UsuariosPage from './pages/UsuariosPage.jsx';
import ProductosPage from './pages/ProductosPage.jsx';
import ServiciosPage from './pages/ServiciosPage.jsx';

function App() {
  const API_URL = 'http://localhost:3000/api';
  const [usuarioActual, setUsuarioActual] = useState(null); // Estado global de usuario logueado

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    return usuarioActual ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="main-title mb-5 text-center">
          Gestión de Usuarios, Productos y Servicios
        </h1>

        {/* -------------------- NAVBAR -------------------- */}
        {usuarioActual && (
          <nav className="mb-4">
            <Link className="btn btn-primary me-2" to="/">Usuarios</Link>
            <Link className="btn btn-success me-2" to="/productos">Productos</Link>
            <Link className="btn btn-warning me-2" to="/servicios">Servicios</Link>
            <button
              className="btn btn-danger float-end"
              onClick={() => setUsuarioActual(null)}
            >
              Cerrar sesión
            </button>
          </nav>
        )}

        {/* -------------------- RUTAS -------------------- */}
        <Routes>
          {/* Página de Login */}
          <Route path="/login" element={<LoginPage API_URL={API_URL} setUsuarioActual={setUsuarioActual} />} />

          {/* Páginas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <UsuariosPage API_URL={API_URL} />
            </ProtectedRoute>
          } />
          <Route path="/productos" element={
            <ProtectedRoute>
              <ProductosPage API_URL={API_URL} />
            </ProtectedRoute>
          } />
          <Route path="/servicios" element={
            <ProtectedRoute>
              <ServiciosPage API_URL={API_URL} />
            </ProtectedRoute>
          } />

          {/* Redirigir cualquier ruta desconocida */}
          <Route path="*" element={<Navigate to={usuarioActual ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;