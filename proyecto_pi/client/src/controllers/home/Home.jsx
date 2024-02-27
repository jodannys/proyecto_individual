import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
  return (
    <div className="container-home">
      <div className="image-container">
          <img className="home-img" src= "" alt="" />
      </div>
      <div className="text-container-home">
        <div className="content-container-home">
          <p className="welcome-text">¡Bienvenido a DogWorld! 🐾</p>
          <p className="description">
            Explora el fascinante mundo de los perros con DogWorld, descubre una amplia variedad de razas.
          </p>
          <p className="description">
            Ya sea que estés buscando tu próxima mascota, investigando sobre razas
            específicas o simplemente disfrutando de la compañía virtual de
            adorables cachorros, DogWorld es el lugar perfecto para ti.
          </p>
          <p className="description">
            ¡Comienza tu aventura hoy mismo y sumérgete en el maravilloso universo
            de los perros en DogWorld!
          </p>
          <br />
          </div>
          <div className="button-container">
            <Link to="/buscar">
              <button className="button-home">Ver mas </button>
            </Link>
        </div>
      </div>
    </div>
  );
  }  

export default Home;
