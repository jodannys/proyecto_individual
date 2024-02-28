import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const resetPage = () => {
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
            <div className={styles.navbar}>
              <Link to="/temperamento" className={styles.link}>
                <span className={styles.icono2}>Crear temperamento</span>
                <p> </p>
              </Link>
            </div>
          </li>

          <SearchBar />

          <button className={styles.link} onClick={handleLogout}>
            <span className={styles.icono4}>Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
