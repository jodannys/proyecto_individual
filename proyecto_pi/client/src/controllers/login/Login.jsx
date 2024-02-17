// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Obtener el objeto de navegación

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post("http://localhost:3001/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         // Inicio de sesión exitoso, redirigir al usuario a la página de inicio
//         navigate("/home"); // Redirigir a la ruta "/home"
//       }
//     } catch (error) {
//       setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar Sesión</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Correo Electrónico:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" onClick={() => console.log("Botón de inicio de sesión clickeado")}>
//           Iniciar Sesión
//         </button>
//         <button onClick={() => navigate("/registro")}>Registrarse</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// // export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Por favor, ingresa tu correo electrónico y contraseña.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3001/login", {
//         email,
//         password,
//       });

//       if (response.data.access) {
//         // La autenticación fue exitosa
//         navigate("/home");
//       } else {
//         // La autenticación falló, mostrar mensaje de error adecuado
//         setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
//       }
//     } catch (error) {
//       // Manejar errores de red u otros errores del servidor
//       if (error.response && error.response.status === 400) {
//         setError("Correo electrónico no registrado");
//       } else {
//         setError("Error de conexión. Por favor, intenta nuevamente más tarde.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar Sesión</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Correo Electrónico:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Iniciar Sesión</button>
//         <button onClick={() => navigate("/registro")}>Registrarse</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;
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
        // La autenticación fue exitosa
        navigate("/home");
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
