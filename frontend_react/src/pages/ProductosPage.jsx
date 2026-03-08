// src/pages/ProductosPage.jsx
import React, { useState, useEffect } from "react";
import ProductoForm from "../components/ProductoForm.jsx";
import ProductoList from "../components/ProductoList.jsx";

const ProductosPage = ({ API_URL }) => {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProductos = async () => {
    const res = await fetch(`${API_URL}/productos`);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => { fetchProductos(); }, []);

  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-success text-center">Productos</h1>

      {/* Buscador al estilo Servicios */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Formulario */}
      <div className="card p-4 shadow-sm mb-3 border-success">
        <h3>{productoEdit ? "Editar Producto" : "Crear Producto"}</h3>
        <ProductoForm
          onSubmit={
            productoEdit
              ? (data) => {
                  fetch(`${API_URL}/productos/${productoEdit._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  })
                    .then(res => res.json())
                    .then(data => {
                      setProductos(productos.map(p => p._id === productoEdit._id ? data : p));
                      setProductoEdit(null);
                    });
                }
              : (data) => {
                  fetch(`${API_URL}/productos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  })
                    .then(res => res.json())
                    .then(data => setProductos([...productos, data]));
                }
          }
          initialData={productoEdit}
        />
      </div>

      {/* Lista */}
      <ProductoList
        productos={filteredProductos}
        onDelete={(id) => {
          fetch(`${API_URL}/productos/${id}`, { method: "DELETE" })
            .then(() => setProductos(productos.filter(p => p._id !== id)));
        }}
        onEdit={setProductoEdit}
      />
    </div>
  );
};

export default ProductosPage;