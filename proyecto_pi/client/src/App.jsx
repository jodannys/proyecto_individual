import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./controllers/navBar/NavBar";
import Login from "./controllers/login/Login";
import Form from "./controllers/form/Form";
import BuscarDog from "./controllers/buscarDog/BuscarDog";
import DogAgregar from "./controllers/dogAgregar/DogAgregar";
import DogDetail from "./controllers/dogDetail/DogDetail";
import axios from "axios";

const App = () => {
  const [perros, setPerros] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPerros = async () => {
      try {
        const response = await axios.get("http://localhost:3001/dogs");
        setPerros(response.data);
      } catch (error) {
        console.error("Error al obtener los perros:", error);
      }
    };

    fetchPerros();
  }, []);

  // Verificar si la ruta actual no es "/" ni "/registro" para decidir si mostrar la barra de navegación
  const showNavbar = location.pathname !== "/" && location.pathname !== "/registro";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Form />} />
        <Route path="/buscar" element={<BuscarDog perros={perros} />} />
        <Route path="/dogAgregar" element={<DogAgregar />} />
        <Route path="/detail/:id" element={<DogDetail />} />
      </Routes>
    </div>
  );
};

export default App;
