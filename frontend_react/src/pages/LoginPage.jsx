import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ API_URL, setUsuarioActual }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //  Limpiar campos al montar
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error al iniciar sesión");
        return;
      }

      //  Guardar sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      //  Estado global
      setUsuarioActual(data.usuario);

      //  Limpiar inputs después de login
      setEmail("");
      setPassword("");

      //  Redirección
      navigate("/");
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>

        <h3 className="text-center mb-3">
          Gestión de Usuarios
        </h3>

        <form onSubmit={handleLogin} autoComplete="off">

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger p-2">
              {error}
            </div>
          )}

          <button className="btn btn-primary w-100" type="submit">
            Entrar
          </button>

        </form>
      </div>
    </div>
  );
}