import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ruta actual
import SearchBar from "../searchBar/SearchBar";
import './NavBar.css'; // Importa el archivo de estilos CSS

const Navbar = () => {
  const location = useLocation(); // Obtiene la ruta actual

  // Renderiza la barra de navegación en todas las rutas excepto "/login"
  if (location.pathname !== '/login') {
    return (
      <nav className="navbar"> {/* Aplica la clase CSS navbar */}
        <ul className="navbar-list"> {/* Aplica la clase CSS navbar-list */}
          <li className="navbar-item"> {/* Aplica la clase CSS navbar-item */}
            <Link to="/" className="navbar-link">Inicio</Link> {/* Aplica la clase CSS navbar-link */}
          </li>
          <li className="navbar-item"> {/* Aplica la clase CSS navbar-item */}
            <Link to="/dogs" className="navbar-link">Perros</Link> {/* Aplica la clase CSS navbar-link */}
          </li>
          <li className="navbar-item"> {/* Aplica la clase CSS navbar-item */}
            <Link to="/about" className="navbar-link">Acerca de</Link> {/* Aplica la clase CSS navbar-link */}
          </li>
          <li> <Link to="/buscar" className="navbar-link">filtrar </Link></li>
          {/* Agrega más elementos <li> y <Link> según sea necesario */}
        </ul>
        <SearchBar className="search-bar" /> {/* Aplica la clase CSS search-bar */}
      </nav>
    );
  } else {
    return null; // Si estás en la ruta "/login", no renderiza la barra de navegación
  }
};

export default Navbar;
