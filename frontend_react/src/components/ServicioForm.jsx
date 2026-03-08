import React, { useState, useEffect } from 'react';

function ServicioForm({ onSubmit, initialData }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  // Cuando cambie initialData (al seleccionar editar o al limpiar edición)
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setDescripcion(initialData.descripcion || '');
      setPrecio(initialData.precio || '');
      setStock(initialData.stock || '');
    } else {
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, descripcion, precio, stock });

    // Limpiar campos solo si es creación
    if (!initialData) {
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Nombre del servicio"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
        required
      />
      <button className="btn btn-primary">
        {initialData ? 'Actualizar Servicio' : 'Crear Servicio'}
      </button>
    </form>
  );
}

export default ServicioForm;