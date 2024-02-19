import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/buscar");
      }
    } catch (error) {
      // Manejar errores de red u otros errores del servidor
      if (error.response && error.response.status === 401) {
        setError("Correo electrónico o contraseña incorrectos");
      } else {
        setError("Error de conexión. Por favor, intenta nuevamente más tarde.");
      }
    }
  };

  return (
    <div>
      <h1>Descubre todo lo que necesitas saber sobre los perros en un solo lugar: ¡All about dogs!</h1>
      <h3>¡Aquí encontrarás una amplia variedad de información confiable y útil para todos los amantes de los perros.!</h3>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button onClick={() => navigate("/registro")}>Registrarse</button>
      </form>
      {error && <p>{error}</p>}

    </div>
  );
};

export default Login;
