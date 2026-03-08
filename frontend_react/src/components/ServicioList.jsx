import React from 'react';

function ServicioList({ servicios, onDelete, onEdit }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-3 text-warning">Lista de Servicios</h4>

        <table className="table table-striped table-hover">
          <thead className="table-warning">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map(servicio => (
              <tr key={servicio._id}>
                <td>{servicio.nombre}</td>
                <td>{servicio.descripcion}</td>
                <td>${servicio.precio}</td>
                <td>{servicio.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(servicio)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(servicio._id)}
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
}

export default ServicioList;