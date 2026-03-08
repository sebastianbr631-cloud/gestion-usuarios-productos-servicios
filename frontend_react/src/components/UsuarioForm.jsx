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
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {!initialData && (
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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