import React, { useState, useEffect } from "react";
import ServicioForm from "../components/ServicioForm.jsx";
import ServicioList from "../components/ServicioList.jsx";

const ServiciosPage = ({ API_URL }) => {
  const [servicios, setServicios] = useState([]);
  const [servicioEdit, setServicioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  // -------------------- GET --------------------
  const fetchServicios = async () => {
    try {
      const res = await fetch(`${API_URL}/servicios`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    }
  };

  // -------------------- CREATE --------------------
  const createServicio = async (servicio) => {
    try {
      const res = await fetch(`${API_URL}/servicios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(servicio)
      });

      const data = await res.json();
      setServicios([...servicios, data]);
    } catch (error) {
      console.error("Error creando servicio:", error);
    }
  };

  // -------------------- UPDATE --------------------
  const updateServicio = async (id, servicio) => {
    try {
      const res = await fetch(`${API_URL}/servicios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(servicio)
      });

      const data = await res.json();

      setServicios(
        servicios.map(s => (s._id === id ? data : s))
      );

      setServicioEdit(null);
    } catch (error) {
      console.error("Error actualizando servicio:", error);
    }
  };

  // -------------------- DELETE --------------------
  const deleteServicio = async (id) => {
    try {
      await fetch(`${API_URL}/servicios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setServicios(servicios.filter(s => s._id !== id));
    } catch (error) {
      console.error("Error eliminando servicio:", error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const filteredServicios = servicios.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-warning text-center">Servicios</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar servicio..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="card p-4 shadow-sm mb-3 border-warning">
        <h3>{servicioEdit ? "Editar Servicio" : "Crear Servicio"}</h3>

        <ServicioForm
          onSubmit={
            servicioEdit
              ? (data) => updateServicio(servicioEdit._id, data)
              : createServicio
          }
          initialData={servicioEdit}
        />
      </div>

      <ServicioList
        servicios={filteredServicios}
        onDelete={deleteServicio}
        onEdit={setServicioEdit}
      />
    </div>
  );
};

export default ServiciosPage;