import React, { useState, useEffect } from "react";
import ProductoForm from "../components/ProductoForm.jsx";
import ProductoList from "../components/ProductoList.jsx";

const ProductosPage = ({ API_URL }) => {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------- HEADERS CON TOKEN --------------------
  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // -------------------- GET PRODUCTOS --------------------
  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos`, { headers: getHeaders() });
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProductos([]);
    }
  };

  // -------------------- CREATE --------------------
  const createProducto = async (producto) => {
    try {
      const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      setProductos((prev) => (Array.isArray(prev) ? [...prev, data] : [data]));
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  // -------------------- UPDATE --------------------
  const updateProducto = async (id, producto) => {
    try {
      const res = await fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      setProductos((prev) => prev.map((p) => (p._id === id ? data : p)));
      setProductoEdit(null);
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  // -------------------- DELETE --------------------
  const deleteProducto = async (id) => {
    try {
      await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      setProductos((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // -------------------- LOAD --------------------
  useEffect(() => {
    fetchProductos();
  }, [API_URL]);

  // -------------------- FILTRO --------------------
  const filteredProductos = (Array.isArray(productos) ? productos : []).filter((p) =>
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-success text-center">Productos</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FORMULARIO */}
      <div className="card p-4 shadow-sm mb-3 border-success">
        <h3>{productoEdit ? "Editar Producto" : "Crear Producto"}</h3>
        <ProductoForm
          onSubmit={
            productoEdit
              ? (data) => updateProducto(productoEdit._id, data)
              : createProducto
          }
          initialData={productoEdit}
        />
      </div>

      {/* LISTA */}
      <ProductoList
        productos={filteredProductos}
        onDelete={deleteProducto}
        onEdit={setProductoEdit}
      />
    </div>
  );
};

export default ProductosPage;