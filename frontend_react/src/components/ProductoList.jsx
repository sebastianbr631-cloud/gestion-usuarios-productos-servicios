import React from "react";

const ProductoList = ({ productos, onDelete, onEdit }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">

        {/* Título buscador y lista */}
        <h4 className="mb-3 text-success">Lista de Productos</h4>

        <table className="table table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ProductoList;