import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import DogCard from "../dogCard/DogCard"; // Importa tu componente de tarjeta de perro aquí/
import styles from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const resetPage = () => {
    setSearchResults([]); // Reinicia los resultados de la búsqueda al cambiar de página
    navigate("/buscar");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className={styles.container}>
        <ul className={styles.login}>
          <li className={styles.navbar}>
            <Link to="/buscar" className={styles.link} onClick={resetPage}>
              <span className={styles.icono}>Inicio</span>
            </Link>

            <div className={styles.navbar}>
              <Link to="/dogAgregar" className={styles.link}>
                <span className={styles.icono3}>Crear Perro</span>
              </Link>
            </div>
          </li>

          <SearchBar setSearchResults={setSearchResults} />

          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((dog) => (
                <DogCard key={dog.id} dog={dog} /> // Utiliza tu componente de tarjeta de perro para mostrar cada perro encontrado
              ))}
            </div>
          )}

          <button className={styles.link} onClick={handleLogout}>
            <span className={styles.icono4}>Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
