import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../dogCard/DogCard";
import CardBd from "../cardBD/CardBd";
import DogPaginacion from "../dogPaginacion/DogPaginacion";
import FiltrosBuscar from "../filtrosDog/FiltrosDog";
import styles from "./BuscarDog.module.css";
import {
  addTemperaments,
  addDogs,
  addRazas,
  addFromApi,
  addFromDatabase,
  ordenarAscendenteDescendente,
  ordenarDescendenteAscendente,
  searchDogsByName,
  ordenarLivianoPesado,
  ordenarPesadoLiviano,
  resetFilters,
} from "../../redux/actions";

function BuscarDog() {
  const dispatch = useDispatch();
  const dogsFromApi = useSelector((state) => state.dogsFromApi);
  const dogsFromDatabase = useSelector((state) => state.dogsFromDatabase);
  const temperaments = useSelector((state) => state.temperaments);
  const razas = useSelector((state) => state.razas);
  const searchResults = useSelector((state) => state.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag] = useState(8);
  const [peso, setPeso] = useState("");
  const [orderAlfabet, setOrderAlfabet] = useState("");
  const [temperamentSelected, setTemperamentSelected] = useState("");
  const [razaSelected, setRazaSelected] = useState("");
  const [origenSelected, setOrigenSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Fetching initial data...");
    dispatch(addTemperaments());
    dispatch(addFromApi());
    dispatch(addDogs());
    dispatch(addRazas());
    dispatch(addFromDatabase());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      "Datos del perro recibidos del estado de Redux:",
      searchResults
    );
  }, [searchResults]);

  const handleResetFilters = () => {
    setPeso("");
    setOrderAlfabet("");
    setTemperamentSelected("");
    setRazaSelected("");
    setOrigenSelected("");
    setSearchTerm("");
    setCurrentPage(1);
    dispatch(resetFilters());
  };

  const handleSearchByName = () => {
    setCurrentPage(1);
    dispatch(searchDogsByName(searchTerm));
  };

  const handlePesoSelectedChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Estado de peso después de la selección:", selectedValue);
    setPeso(selectedValue);
    setOrderAlfabet("");
    setTemperamentSelected("");
    setRazaSelected("");
    setCurrentPage(1);
  };

  const handleAlfabetSelectedChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "asc-desc") {
      dispatch(ordenarAscendenteDescendente());
    } else if (selectedValue === "desc-asc") {
      dispatch(ordenarDescendenteAscendente());
    }
    setOrderAlfabet(selectedValue);
    setPeso("");
    setTemperamentSelected("");
    setRazaSelected("");
    setCurrentPage(1);
  };

  const handleOrigenChange = (e) => {
    setOrigenSelected(e.target.value);
    setCurrentPage(1);
  };

  const handleTemperamentChange = (e) => {
    setTemperamentSelected(e.target.value);
    setPeso("");
    setOrderAlfabet("");
    setRazaSelected("");
    setCurrentPage(1);
  };

  const handleRazaChange = (e) => {
    setRazaSelected(e.target.value);
    setPeso("");
    setOrderAlfabet("");
    setTemperamentSelected("");
    setCurrentPage(1);
  };

  const renderDogCards = () => {
    let filteredDogs = origenSelected === "database" ? dogsFromDatabase : dogsFromApi;

    if (temperamentSelected) {
      const selectedTemperaments = Array.isArray(temperamentSelected)
        ? temperamentSelected
        : [temperamentSelected];

      filteredDogs = filteredDogs.filter((dog) =>
        selectedTemperaments.some((temp) => dog.temperament?.includes(temp))
      );
    }

    if (razaSelected) {
      filteredDogs = filteredDogs.filter((dog) => dog.name === razaSelected);
    }

    if (peso === "liviano-pesado") {
      filteredDogs = filteredDogs.filter(dog => dog.weight && dog.weight.metric);
      filteredDogs.sort((a, b) => parseFloat(a.weight.metric) - parseFloat(b.weight.metric));
    } else if (peso === "pesado-liviano") {
      filteredDogs = filteredDogs.filter(dog => dog.weight && dog.weight.metric);
      filteredDogs.sort((a, b) => parseFloat(b.weight.metric) - parseFloat(a.weight.metric));
    }
    

    if (orderAlfabet === "asc-desc") {
      filteredDogs = filteredDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderAlfabet === "desc-asc") {
      filteredDogs = filteredDogs.sort((a, b) => b.name.localeCompare(a.name));
    }

    const dogsToRender = searchResults.length > 0 ? searchResults : filteredDogs;

    const indexOfLastItem = currentPage * itemsPorPag;
    const indexOfFirstItem = indexOfLastItem - itemsPorPag;
    const currentDogs = dogsToRender.slice(indexOfFirstItem, indexOfLastItem);

    return currentDogs.map((dog) =>
      origenSelected === "database" ? (
        <CardBd
          key={dog.id}
          id={dog.id}
          name={dog.name}
          temperaments={dog.temperament}
          altura={dog.altura}
          peso={dog.peso}
          años_vida={dog.años_vida}
          imagenURL={dog.imagenURL}
        />
      ) : (
        <DogCard
          key={dog.id}
          img={dog.reference_image_id}
          name={dog.name}
          temperament={dog.temperament}
          weight={dog.weight}
          id={dog.id}
        />
      )
    );
  };

  const totalFilteredDogs = searchResults.length > 0
    ? searchResults.length
    : (origenSelected === "database" ? dogsFromDatabase : dogsFromApi)
        .filter((dog) => {
            if (temperamentSelected && razaSelected) {
                return (
                    dog.temperament?.includes(temperamentSelected) &&
                    dog.name === razaSelected
                );
            } else if (temperamentSelected) {
                return dog.temperament?.includes(temperamentSelected);
            } else if (razaSelected) {
                return dog.name === razaSelected;
            }
            return true;
        }).length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  const handleOrdenarLivianoPesado = () => {
    dispatch(ordenarLivianoPesado());
  };

  const handleOrdenarPesadoLiviano = () => {
    dispatch(ordenarPesadoLiviano());
  };

  return (
    <div className={styles.busqueda}>
      <FiltrosBuscar
        peso={peso}
        orderAlfabet={orderAlfabet}
        temperamentSelected={temperamentSelected}
        razaSelected={razaSelected}
        origenSelected={origenSelected}
        setPeso={setPeso}
        setOrderAlfabet={setOrderAlfabet}
        setTemperamentSelected={setTemperamentSelected}
        setRazaSelected={setRazaSelected}
        setOrigenSelected={setOrigenSelected}
        temperaments={temperaments}
        razas={razas}
        pesoSelectedChange={handlePesoSelectedChange}
        alfabetSelectedChange={handleAlfabetSelectedChange}
        temperamentChange={handleTemperamentChange}
        resetFilters={handleResetFilters}
        razaChange={handleRazaChange}
        handleOrigenChange={handleOrigenChange}
        setSearchTerm={setSearchTerm} 
        handleSearchByName={handleSearchByName} 
        handleOrdenarLivianoPesado={handleOrdenarLivianoPesado}
        handleOrdenarPesadoLiviano={handleOrdenarPesadoLiviano}
      />

      <div>{renderDogCards()}</div>
      <div>
        <DogPaginacion
          itemsPorPag={itemsPorPag}
          currentPage={currentPage}
          totalPosts={totalFilteredDogs}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default BuscarDog;

