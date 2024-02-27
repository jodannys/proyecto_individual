
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./controllers/navBar/NavBar";
import Home from "./controllers/home/Home";
import BuscarDog from "./controllers/buscarDog/BuscarDog";
import DogAgregar from "./controllers/dogAgregar/DogAgregar";
import DogDetail from "./controllers/dogDetail/DogDetail";
import DogDetailBd from "./controllers/dogDetailBd/DogDetailBd";
import TemperamentForm from "./controllers/crearTemperamento/Temperamentos";

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarDog />} />
        <Route path="/dogAgregar" element={<DogAgregar />} />
        <Route path="/temperamento" element={<TemperamentForm />} />
        <Route path="/detail/:id" element={<DogDetail />} />
        <Route path="/detailBd/:id" element={<DogDetailBd />} />
        <Route path="/dog/:id" element={<DogDetail />} />
      </Routes>
    </div>
  );
};

export default App;

