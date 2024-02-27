import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import "./NavBar.css";

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
      <nav className="navbar">
        <ul className="login">
          <li className="navbar-item">
            <Link to="/buscar" className="link" onClick={resetPage}>
              <span className="icono">Inicio</span>
            </Link>

            <div className="navbar-item">
              <Link to="/dogAgregar" className="link">
                <span className="icono3">Crear Perro</span>
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/temperamento" className="link">
                <span className="icono2">Crear temperamento</span>
                <p> </p>
              </Link>
            </div>
          </li>
  
          <SearchBar className="search-bar" />
                

          <button className="link" onClick={handleLogout}>
            <span className="icono4">Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
