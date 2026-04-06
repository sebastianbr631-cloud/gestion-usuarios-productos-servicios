import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import UsuariosPage from './pages/UsuariosPage.jsx';
import ProductosPage from './pages/ProductosPage.jsx';
import ServiciosPage from './pages/ServiciosPage.jsx';

function App() {
  const API_URL = 'http://localhost:3000/api';

  return (
    <Router>
      <div className="container mt-5">

        <h1 className="text-center mb-4">
          Gestión de Usuarios, Productos y Servicios
        </h1>

        <nav className="mb-4">
          <Link className="btn btn-primary me-2" to="/">Usuarios</Link>
          <Link className="btn btn-success me-2" to="/productos">Productos</Link>
          <Link className="btn btn-warning me-2" to="/servicios">Servicios</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UsuariosPage API_URL={API_URL} />} />
          <Route path="/productos" element={<ProductosPage API_URL={API_URL} />} />
          <Route path="/servicios" element={<ServiciosPage API_URL={API_URL} />} />
          <Route path="*" element={<UsuariosPage API_URL={API_URL} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;