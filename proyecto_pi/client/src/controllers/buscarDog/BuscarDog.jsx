import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DogCard from "../dogCard/DogCard";
import DogPaginacion from "../dogPaginacion/DogPaginacion";
import "./BuscarDog.css";

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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperamentos`)
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
      .get(`http://localhost:3001/dogs`)
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
      .get(`http://localhost:3001/dogs`) // Endpoint para obtener las razas
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
  };

  const temperamentChange = (e) => {
    setTemperamentSelected(e.target.value);
  };

  const razaChange = (e) => {
    setRazaSelected(e.target.value);
    console.log(e.target.value);
  };

  const renderDogCards = () => {
    // Filtrar perros según los valores seleccionados en los filtros
    let filteredDogs = dogs;

    if (temperamentSelected) {
      filteredDogs = filteredDogs.filter((dog) =>
        dog.temperament?.includes(temperamentSelected)
      );
    }

    if (razaSelected) {
      filteredDogs = filteredDogs.filter((dog) => dog.name === razaSelected);
    }
    const indexOfLastItem = currentPage * itemsPorPag;
    const indexOfFirstItem = indexOfLastItem - itemsPorPag;
    const currentDogs = filteredDogs.slice(indexOfFirstItem, indexOfLastItem);

    return currentDogs.map((dog) => (
      <DogCard
        key={dog.id}
        img={dog.reference_image_id}
        name={dog.name}
        temperament={dog.temperament}
        weight={dog.weight}
        id={dog.id}
      />
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
      <div className="container-todos-select">
          <div className="select-container1">
            <p>Ordenar por peso</p>
            <select
              className="imput"
              value={peso}
              onChange={pesoSelectedChange}
            >
              <option value={""}>Peso</option>
              <option value="pesado-liviano">Peso de mayor a menor</option>
              <option value="liviano-pesado">Peso de menor a mayor</option>
            </select>
          </div>
          <div className="select-container2">
            <p>Ordenar alfabeticamente</p>
            <select
              className="imput"
              value={orderAlfabet}
              onChange={alfabetSelectedChange}
            >
              <option value={""}>A-Z</option>
              <option value="asc-desc">Ascendente</option>
              <option value="desc-asc">Descendente</option>
            </select>
          </div>
          <div className="select-container3">
            <p>Filtrar por temperamento</p>
            <select className="imput" onChange={temperamentChange}>
              <option value={""}>Temperamentos</option>
              <option value={""}>Seleccionar filtro</option>
              {temperaments.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select-container4">
            <p>Filtrar por raza</p>
            <select className="imput" onChange={razaChange}>
              <option value={""}>Razas</option>
              {razas.map((raza) => (
                <option key={raza.id} value={raza.name}>
                  {raza.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="dogs-container">
        {dogs.length > 0 ? renderDogCards() : <p>No hay perros disponibles.</p>}
      </div>
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
