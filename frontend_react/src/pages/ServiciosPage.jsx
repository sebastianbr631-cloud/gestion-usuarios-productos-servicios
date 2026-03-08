// src/pages/ServiciosPage.jsx
import React, { useState, useEffect } from "react";
import ServicioForm from "../components/ServicioForm.jsx";
import ServicioList from "../components/ServicioList.jsx";

const ServiciosPage = ({ API_URL }) => {
  const [servicios, setServicios] = useState([]);
  const [servicioEdit, setServicioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado del buscador

  // -------------------- CRUD --------------------
  const fetchServicios = async () => {
    try {
      const res = await fetch(`${API_URL}/servicios`);
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    }
  };

  const createServicio = async (servicio) => {
    try {
      const res = await fetch(`${API_URL}/servicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio)
      });
      const data = await res.json();
      setServicios([...servicios, data]);
    } catch (error) {
      console.error("Error creando servicio:", error);
    }
  };

  const updateServicio = async (id, servicio) => {
    try {
      const res = await fetch(`${API_URL}/servicios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio)
      });
      const data = await res.json();
      setServicios(servicios.map(s => (s._id === id ? data : s)));
      setServicioEdit(null);
    } catch (error) {
      console.error("Error actualizando servicio:", error);
    }
  };

  const deleteServicio = async (id) => {
    try {
      await fetch(`${API_URL}/servicios/${id}`, { method: "DELETE" });
      setServicios(servicios.filter(s => s._id !== id));
    } catch (error) {
      console.error("Error eliminando servicio:", error);
    }
  };

  // -------------------- CARGAR DATOS --------------------
  useEffect(() => {
    fetchServicios();
  }, []);

  // -------------------- FILTRO BUSCADOR --------------------
  const filteredServicios = servicios.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------- RENDER --------------------
  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-warning text-center">Servicios</h1>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar servicio nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Formulario */}
      <div className="card p-4 shadow-sm mb-3 border-warning">
        <h3>{servicioEdit ? "Editar Servicio" : "Crear Servicio"}</h3>
        <ServicioForm
          onSubmit={servicioEdit ? (data) => updateServicio(servicioEdit._id, data) : createServicio}
          initialData={servicioEdit}
        />
      </div>

      {/* Lista filtrada */}
      <ServicioList
        servicios={filteredServicios}
        onDelete={deleteServicio}
        onEdit={setServicioEdit}
      />
    </div>
  );
};

export default ServiciosPage;