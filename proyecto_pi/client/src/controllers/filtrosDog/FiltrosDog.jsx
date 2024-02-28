import React from "react";
import styles from "./FiltrosDog.module.css";

const FiltrosBuscar = ({
  peso,
  orderAlfabet,
  temperamentSelected,
  razaSelected,
  origenSelected,
  setPeso,
  setOrderAlfabet,
  setTemperamentSelected,
  setRazaSelected,
  setOrigenSelected,
  temperaments,
  razas,
  pesoSelectedChange,
  alfabetSelectedChange,
  temperamentChange,
  razaChange,
  resetFilters,
  fetchFromApi,
  fetchFromDatabase,
}) => {
  const handleReset = () => {
    setPeso("");
    setOrderAlfabet("");
    setTemperamentSelected("");
    setRazaSelected("");
    resetFilters();
  };

  const handleFetchFromApi = () => {
    setOrigenSelected("api");
    console.log("Origen seleccionado: API");
    fetchFromApi();
  };

  const handleFetchFromDatabase = () => {
    setOrigenSelected("database");
    console.log("Origen seleccionado: Base de datos");
    fetchFromDatabase();
  };

  return (
    <div className={styles.filtrado}>
      <div className={styles.container}>
        <div className={styles.select}>
          <p>Ordenar por peso</p>
          <select
            className={styles.input}
            value={peso}
            onChange={pesoSelectedChange}
          >
            <option value="">Peso</option>
            <option value="liviano-pesado">Peso de mayor a menor</option>
            <option value="pesado-liviano">Peso de menor a mayor</option>
          </select>
        </div>
        <div className={styles.select}>
          <p>Ordenar alfabéticamente</p>
          <select
            className={styles.input}
            value={orderAlfabet}
            onChange={alfabetSelectedChange}
          >
            <option value="">A-Z</option>
            <option value="asc-desc">Ascendente</option>
            <option value="desc-asc">Descendente</option>
          </select>
        </div>
        <div className={styles.select}>
          <p>Filtrar por temperamento</p>
          <select
            className={styles.input}
            value={temperamentSelected}
            onChange={temperamentChange}
          >
            <option value="">Temperamentos</option>
            {temperaments.length > 0 ? (
              temperaments.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))
            ) : (
              <option disabled>No hay temperamentos disponibles</option>
            )}
          </select>
        </div>
        <div className={styles.select}>
          <p>Filtrar por raza</p>
          <select
            className={styles.input}
            value={razaSelected}
            onChange={razaChange}
          >
            <option value="">Razas</option>
            {razas.length > 0 ? (
              razas.map((raza) => (
                <option key={raza.id} value={raza.name}>
                  {raza.name}
                </option>
              ))
            ) : (
              <option disabled>No hay razas disponibles</option>
            )}
          </select>
        </div>
        <div className={styles.select}>
          <p>Filtrar por origen</p>
          <select
            className={styles.input}
            value={origenSelected}
            onChange={(e) => {
              setOrigenSelected(e.target.value);
              console.log("Origen seleccionado:", e.target.value);
              if (e.target.value === "api") {
                fetchFromApi();
              } else if (e.target.value === "database") {
                fetchFromDatabase();
              }
            }}
          >
            <option value="">Origen</option>
            <option value="api">API</option>
            <option value="database">Base de datos</option>
          </select>
        </div>

        <button className={styles.reset} onClick={handleReset}>
          Resetear <br />
          filtros
        </button>
      </div>
    </div>
  );
};

export default FiltrosBuscar;
