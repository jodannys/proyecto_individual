import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchBar/SearchBar";
import "./NavBar.css";

const Navbar = () => {
  const location = useLocation();

  if (location.pathname !== "/login" && location.pathname !== "/registro") {
    return (
      <div>
      <nav className="navbar">
        <ul className="login">
          <div className="navbar-item">
            <Link to="/buscar" className="link">
              <span className="text2">Inicio</span>
            </Link>
            <div className="navbar-item">
              <Link to="/dogAgregar" className="link">
                <span className="text3">Crear Perro</span>
              </Link>
              <FontAwesomeIcon icon={faBone} className="icono2" />
            </div>
            <FontAwesomeIcon icon={faBone} className="icono3" />
          </div>
          <SearchBar className="search-bar" />
          <div className="logoContainer">
            <Link to="/" className="link">
              <span className="text1">Cerrar Sesión</span>
            </Link>
            <FontAwesomeIcon icon={faBone} className="icono" />
          </div>
        </ul>
      </nav>
    </div>
    );
  } else {
    return (
      <nav className="navbar">
        <SearchBar className="search-bar" />
      </nav>
    );
  }
};

export default Navbar;
