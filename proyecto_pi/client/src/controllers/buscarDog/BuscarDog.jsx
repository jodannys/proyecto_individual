import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DogCard from "../dogCard/DogCard";
import CardBd from "../cardBD/CardBd";
import DogPaginacion from "../dogPaginacion/DogPaginacion";
import FiltrosBuscar from "../filtrosDog/FiltrosDog";
import styles from "./BuscarDog.module.css";
const URL = process.env.SERVER_URL;

function BuscarDog() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const razas = useSelector((state) => state.razas);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag] = useState(8);
  const [peso, setPeso] = useState("");
  const [orderAlfabet, setOrderAlfabet] = useState("");
  const [temperamentSelected, setTemperamentSelected] = useState("");
  const [razaSelected, setRazaSelected] = useState("");
  const [origenSelected, setOrigenSelected] = useState(""); // Agregar origenSelected al estado local

  // Función para resetear los filtros
  const resetFilters = () => {
    setPeso("");
    setOrderAlfabet("");
    setTemperamentSelected("");
    setRazaSelected("");
  };

  useEffect(() => {
    axios
      .get(`${URL}/temperamentos`)
      .then((res) => {
        dispatch({
          type: "ADD_TEMPERAMENTS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URL}/dogs`)
      .then((res) => {
        dispatch({
          type: "ADD_DOGS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URL}/dogs`)
      .then((res) => {
        dispatch({
          type: "ADD_RAZAS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const pesoSelectedChange = (e) => {
    if (e.target.value === "liviano-pesado") {
      dispatch({
        type: "ordenar-pesado-liviano",
      });
    } else if (e.target.value === "pesado-liviano") {
      dispatch({
        type: "ordenar-liviano-pesado",
      });
    }
    setPeso(e.target.value);
    // Reinicia el valor del otro filtro seleccionado
    setOrderAlfabet("");
    setTemperamentSelected("");
    setRazaSelected("");
  };

  const alfabetSelectedChange = (e) => {
    if (e.target.value === "asc-desc") {
      dispatch({
        type: "ordenar-asc-desc",
      });
    } else if (e.target.value === "desc-asc") {
      dispatch({
        type: "ordenar-desc-asc",
      });
    }
    setOrderAlfabet(e.target.value);
    // Reinicia el valor del otro filtro seleccionado
    setPeso("");
    setTemperamentSelected("");
    setRazaSelected("");
  };

  const temperamentChange = (e) => {
    setTemperamentSelected(e.target.value);
    // Reinicia el valor del otro filtro seleccionado
    setPeso("");
    setOrderAlfabet("");
    setRazaSelected("");
  };

  const razaChange = (e) => {
    setRazaSelected(e.target.value);
    // Reinicia el valor del otro filtro seleccionado
    setPeso("");
    setOrderAlfabet("");
    setTemperamentSelected("");
  };

  const fetchFromApi = async () => {
    try {
      const response = await axios.get(`${URL}/dogs`);
      dispatch({
        type: "ADD_DOGS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los perros de la API:", error);
    }
  };

  const fetchFromDatabase = async () => {
    try {
      const response = await axios.get(`${URL}/perros`);
      console.log("Datos de la base de datos:", response.data);
      dispatch({
        type: "ADD_DOGS",
        payload: response.data,
      });
    } catch (error) {
      console.error(
        "Error al obtener los perros desde la base de datos:",
        error
      );
    }
  };

  const renderDogCards = () => {
    // Filtrar perros según los valores seleccionados en los filtros
    let filteredDogs = dogs;

    if (temperamentSelected) {
      // Si temperamentSelected no es un array, conviértelo en uno
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

    const indexOfLastItem = currentPage * itemsPorPag;
    const indexOfFirstItem = indexOfLastItem - itemsPorPag;
    const currentDogs = filteredDogs.slice(indexOfFirstItem, indexOfLastItem);

    return currentDogs.map((dog) =>
      dog.imagenURL ? (
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        pesoSelectedChange={pesoSelectedChange}
        alfabetSelectedChange={alfabetSelectedChange}
        temperamentChange={temperamentChange}
        razaChange={razaChange}
        resetFilters={resetFilters}
        fetchFromApi={fetchFromApi}
        fetchFromDatabase={fetchFromDatabase}
      />
      <div>{dogs.length > 0 && renderDogCards()}</div>
      <div>
        <DogPaginacion
          itemsPorPag={itemsPorPag}
          totalPosts={dogs.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default BuscarDog;
