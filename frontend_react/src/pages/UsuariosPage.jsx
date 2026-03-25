import React, { useState, useEffect } from "react";
import UsuarioForm from "../components/UsuarioForm.jsx";
import UsuarioList from "../components/UsuarioList.jsx";

const UsuariosPage = ({ API_URL }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //  HEADERS CON TOKEN
  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // -------------------- GET USUARIOS --------------------
  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: getHeaders(),
      });

      const data = await res.json();

      //  EVITA CRASH SI NO ES ARRAY
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsuarios([]);
    }
  };

  // -------------------- CREATE --------------------
  const createUsuario = async (usuario) => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      setUsuarios((prev) =>
        Array.isArray(prev) ? [...prev, data] : [data]
      );
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  // -------------------- UPDATE --------------------
  const updateUsuario = async (id, usuario) => {
    try {
      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? data : u))
      );

      setUsuarioEdit(null);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  // -------------------- DELETE --------------------
  const deleteUsuario = async (id) => {
    try {
      await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  // -------------------- LOAD --------------------
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // -------------------- FILTRO SEGURO --------------------
  const filteredUsuarios = (Array.isArray(usuarios) ? usuarios : []).filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-primary text-center">Usuarios</h1>

      {/* BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* FORMULARIO */}
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

      {/* LISTA */}
      <UsuarioList
        usuarios={filteredUsuarios}
        onDelete={deleteUsuario}
        onEdit={setUsuarioEdit}
      />
    </div>
  );
};

export default UsuariosPage;