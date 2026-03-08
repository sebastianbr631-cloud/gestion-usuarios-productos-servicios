import React, { useState, useEffect } from "react";
import UsuarioForm from "../components/UsuarioForm.jsx";
import UsuarioList from "../components/UsuarioList.jsx";

const UsuariosPage = ({ API_URL }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------- CRUD --------------------
  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const createUsuario = async (usuario) => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();
      setUsuarios([...usuarios, data]);
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();
      setUsuarios(usuarios.map(u => u._id === id ? data : u));
      setUsuarioEdit(null);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
      setUsuarios(usuarios.filter(u => u._id !== id));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // -------------------- FILTRO BUSCADOR --------------------
  const filteredUsuarios = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-primary text-center">Usuarios</h1>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Formulario */}
      <div className="card p-4 shadow-sm mb-3 border-primary">
        <h3>{usuarioEdit ? "Editar Usuario" : "Crear Usuario"}</h3>
        <UsuarioForm
          onSubmit={usuarioEdit ? (data) => updateUsuario(usuarioEdit._id, data) : createUsuario}
          initialData={usuarioEdit}
        />
      </div>

      {/* Lista */}
      <UsuarioList
        usuarios={filteredUsuarios}
        onDelete={deleteUsuario}
        onEdit={setUsuarioEdit}
      />
    </div>
  );
};

export default UsuariosPage;