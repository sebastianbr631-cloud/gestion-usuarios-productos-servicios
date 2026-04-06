import React, { useState, useEffect, useCallback } from "react";
import UsuarioForm from "../components/UsuarioForm.jsx";
import UsuarioList from "../components/UsuarioList.jsx";

const UsuariosPage = ({ API_URL }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------- GET USUARIOS --------------------
  const fetchUsuarios = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsuarios([]);
    }
  }, [API_URL]);

  // -------------------- CREATE --------------------
  const createUsuario = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();
      setUsuarios((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  // -------------------- UPDATE --------------------
  const updateUsuario = async (id, usuario) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();
      setUsuarios((prev) => prev.map((u) => (u._id === id ? data : u)));
      setUsuarioEdit(null);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  // -------------------- DELETE --------------------
  const deleteUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  // -------------------- LOAD --------------------
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  // -------------------- FILTRO --------------------
  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-primary text-center">Usuarios</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="card p-4 shadow-sm mb-3 border-primary">
        <h3>{usuarioEdit ? "Editar Usuario" : "Crear Usuario"}</h3>
        <UsuarioForm
          onSubmit={
            usuarioEdit
              ? (data) => updateUsuario(usuarioEdit._id, data)
              : createUsuario
          }
          initialData={usuarioEdit}
        />
      </div>

      <UsuarioList
        usuarios={filteredUsuarios}
        onDelete={deleteUsuario}
        onEdit={setUsuarioEdit}
      />
    </div>
  );
};

export default UsuariosPage;