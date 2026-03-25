import React, { useState, useEffect } from 'react';

function UsuarioForm({ onSubmit, initialData }) {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setUsername(initialData.username || '');
      setEmail(initialData.email || '');
      setPassword('');
    } else {
      setNombre('');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ nombre, username, email, password });

    if (!initialData) {
      setNombre('');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      {/*  CAMPOS FALSOS PARA ENGAÑAR AL NAVEGADOR */}
      <input type="text" name="fakeuser" style={{ display: "none" }} />
      <input type="password" name="fakepass" style={{ display: "none" }} />

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        autoComplete="off"
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="off"
        required
      />

      <input
        className="form-control mb-2"
        type="text" //  CAMBIO CLAVE (antes email)
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="off"
        required
      />

      {!initialData && (
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      )}

      <button className="btn btn-primary">
        {initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
      </button>
    </form>
  );
}

export default UsuarioForm;