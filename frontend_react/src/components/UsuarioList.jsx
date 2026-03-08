import React from "react";

const UsuarioList = ({ usuarios, onDelete, onEdit }) => {
  return (
    <div className="card p-4 shadow-sm mb-3 border-primary">
      <h3 className="mb-3">Lista de Usuarios</h3>
      <table className="table table-striped table-hover">
        <thead className="table-primary">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol || 'usuario'}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(u)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(u._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;