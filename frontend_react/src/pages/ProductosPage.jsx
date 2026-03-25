import React, { useState, useEffect } from "react";
import ProductoForm from "../components/ProductoForm.jsx";
import ProductoList from "../components/ProductoList.jsx";

const ProductosPage = ({ API_URL }) => {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //  TOKEN
  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos`, {
        headers: getHeaders()
      });

      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* FORM */}
      <div className="card p-4 shadow-sm mb-3 border-success">
        <h3>{productoEdit ? "Editar Producto" : "Crear Producto"}</h3>

        <ProductoForm
          onSubmit={
            productoEdit
              ? (data) => {
                  fetch(`${API_URL}/productos/${productoEdit._id}`, {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify(data),
                  })
                    .then(res => res.json())
                    .then(data => {
                      setProductos(productos.map(p =>
                        p._id === productoEdit._id ? data : p
                      ));
                      setProductoEdit(null);
                    });
                }
              : (data) => {
                  fetch(`${API_URL}/productos`, {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(data),
                  })
                    .then(res => res.json())
                    .then(data => setProductos([...productos, data]));
                }
          }
          initialData={productoEdit}
        />
      </div>

      {/* LISTA */}
      <ProductoList
        productos={filteredProductos}
        onDelete={(id) => {
          fetch(`${API_URL}/productos/${id}`, {
            method: "DELETE",
            headers: getHeaders()
          })
            .then(() =>
              setProductos(productos.filter(p => p._id !== id))
            );
        }}
        onEdit={setProductoEdit}
      />
    </div>
  );
};

export default ProductosPage;