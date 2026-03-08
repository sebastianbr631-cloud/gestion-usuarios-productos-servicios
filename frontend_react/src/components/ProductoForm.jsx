import React, { useState, useEffect } from 'react';

function ProductoForm({ onSubmit, initialData }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setPrecio(initialData.precio || '');
      setDescripcion(initialData.descripcion || '');
      setStock(initialData.stock || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      precio: Number(precio),
      descripcion,
      stock: Number(stock)
    });

    if (!initialData) {
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setStock('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
      <input className="form-control mb-2" type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
      <input className="form-control mb-2" type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required />
      <button className="btn btn-primary">{initialData ? "Actualizar Producto" : "Crear Producto"}</button>
    </form>
  );
}

export default ProductoForm;