
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./controllers/navBar/NavBar";
import Home from "./controllers/home/Home";
import Login from "./controllers/login/Login";
import Form from "./controllers/form/Form";
import BuscarDog from "./controllers/buscarDog/BuscarDog";
import DogAgregar from "./controllers/dogAgregar/DogAgregar";
import DogDetail from "./controllers/dogDetail/DogDetail";
import DogPaginacion from "./controllers/dogPaginacion/DogPaginacion";
import axios from "axios";

const App = () => {
  const [perros, setPerros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // 8 perros por página

  useEffect(() => {
    const fetchPerros = async () => {
      const response = await axios.get("http://localhost:3001/dogs");
      setPerros(response.data);
    };

    fetchPerros();
  }, []);

  // Calcular el índice del último perro en la página actual
  const indexOfLastPerro = currentPage * itemsPerPage;
  // Calcular el índice del primer perro en la página actual
  const indexOfFirstPerro = indexOfLastPerro - itemsPerPage;
  // Obtener los perros para la página actual
  const perrosPaginados = perros.slice(indexOfFirstPerro, indexOfLastPerro);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para filtrar por temperamento
  const filterByTemperament = (temperament) => {
    const filteredPerros = perros.filter((perro) =>
      perro.temperament.includes(temperament)
    );
    setPerros(filteredPerros);
  };

  // Función para filtrar por origen
  const filterByOrigin = (origin) => {
    const filteredPerros = perros.filter((perro) => perro.origin === origin);
    setPerros(filteredPerros);
  };

  // Función para ordenar por nombre
  const sortByName = () => {
    const sortedPerros = [...perros].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPerros(sortedPerros);
  };

  // Función para ordenar por peso
  const sortByWeight = () => {
    const sortedPerros = [...perros].sort((a, b) => a.weight - b.weight);
    setPerros(sortedPerros);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/buscar"
          element={
            <BuscarDog
              perros={perros} // Pasamos el estado perros como prop
              filterByTemperament={filterByTemperament}
              filterByOrigin={filterByOrigin}
              sortByName={sortByName}
              sortByWeight={sortByWeight}
            />
          }
        />
        <Route path="/dogAgregar" element={<DogAgregar />} />
        <Route path="/dogDetail/:id" element={<DogDetail />} />
      </Routes>
      <DogPaginacion
        itemsPorPag={itemsPerPage}
        totalPosts={perros.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
