import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "./searchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [buscar, setBuscar] = useState("");
  const [setSearchResults] = useState([]);

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  const handleSearch = () => {
    console.log("Realizando búsqueda...");
    if (!buscar.trim()) {
      alert("Por favor ingresa el nombre del perro a buscar");
      return;
    }
    // Realiza la solicitud al servidor
    axios
      .get(`http://localhost:3001/search?name=${buscar}`)
      .then((res) => {
        console.log("Respuesta del servidor:", res);
        // Verifica si la respuesta contiene datos
        if (res.data.length === 0) {
          alert("No se encontró el perro");
        } else {
          // Actualiza el estado con los resultados de búsqueda
          setSearchResults(res.data);
          // Dispatch para actualizar el estado global si es necesario
          dispatch({
            type: "SEARCH_DOGS",
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        console.error("Error al buscar el perro:", error);
        alert("Ocurrió un error al buscar el perro");
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="containe">
      <input
        className="input"
        placeholder="Buscar"
        value={buscar}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search" onClick={handleSearch}>
        <FontAwesomeIcon icon={faPaw} />
      </button>
    </div>
  );
}

export default SearchBar;
