import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardBd.module.css";
const URL = process.env.SERVER_URL;

const parseWeight = (weight) => {
  return `${weight} kg`;
};

const CardBd = ({
  id,
  name,
  imagenURL,
  altura,
  años_vida,
  temperaments = [],
  peso,
}) => {
  const [dogTemperaments, setDogTemperaments] = useState([]);

  useEffect(() => {
    const fetchDogTemperaments = async () => {
      try {
        console.log("Fetching dog temperaments...");
        if (!id) {
          console.error("ID del perro no disponible");
          return;
        }
        const response = await fetch(`${URL}/perros/${id}/temperamentos`);
        if (!response.ok) {
          throw new Error("Error al obtener los temperamentos del perro");
        }
        const data = await response.json();
        console.log("Temperamentos del perro obtenidos:", data);

        // Actualizar dogTemperaments solo si no está vacío
        if (data.length > 0) {
          setDogTemperaments(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Realizar la solicitud solo una vez (cuando el componente se monte)
    fetchDogTemperaments();
  }, [id]);

  return (
    <div className={styles.caja}>
      <div className={styles.container}>
        <Link to={`/detailBd/${id}`} className={styles.link}>
          <h2 className={styles.name}>
            {" "}
            <FontAwesomeIcon icon={faPaw} /> {name}
          </h2>
          {imagenURL ? (
            <img
              className={styles.img}
              src={imagenURL}
              alt={`Imagen de ${name}`}
            />
          ) : (
            <div className={styles.placeholder}>
              <p>Imagen no disponible</p>
            </div>
          )}

          <div className={styles.content}>
            <p className={styles.temperamento}>
              <strong className={styles.text}> Temperamento:</strong>
              <br />{" "}
              {dogTemperaments && dogTemperaments.length > 0 ? (
                dogTemperaments.map((temperament, index) => (
                  <span key={index}>
                    {temperament.name}
                    {index !== dogTemperaments.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                <span>Temperamento no disponible</span>
              )}
            </p>

            {!peso && (
              <p className={styles.no.disponible}>Peso no disponible</p>
            )}
          </div>
          {peso && (
            <p className={styles.weight}>
              <strong>Peso:</strong> {parseWeight(peso)}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CardBd;
