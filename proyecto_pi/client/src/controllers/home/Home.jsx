import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";

const Home = () => {

 
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img className={styles.home} src="" alt="" />
      </div>
      <div className={styles.text}>
        <div className="content-container-home">
          <p className={styles.welcome}>¡Bienvenido a DogWorld! 🐾</p>
          <p className={styles.description}>
            Explora el fascinante mundo de los perros con DogWorld, descubre una
            amplia variedad de razas.
          </p>
          <p className={styles.description}>
            Ya sea que estés buscando tu próxima mascota, investigando sobre
            razas específicas o simplemente disfrutando de la compañía virtual
            de adorables cachorros, DogWorld es el lugar perfecto para ti.
          </p>
          <p className={styles.description}>
            ¡Comienza tu aventura hoy mismo y sumérgete en el maravilloso
            universo de los perros en DogWorld!
          </p>
          <br />
        </div>
        <div className={styles.button}>
          <Link to="/buscar">
            <button className={styles.boton}>
              <FontAwesomeIcon icon={faPaw} /> Ver mas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
