import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";



function DogCard({ id, name, temperament, weight, img }) {
  const parseWeight = (weight) => {
    if (weight && weight.imperial && weight.metric) {
      const imperial = weight.imperial.split(" - ");
      const metric = weight.metric.split(" - ");
      const imperialWeight = `${imperial[0]} - ${imperial[1]} lbs`;
      const metricWeight = `${metric[0]} - ${metric[1]} kg`;
      return `${imperialWeight} (${metricWeight})`;
    } else {
      return "Peso no disponible";
    }
  };

  // Verifica si los datos de peso son válidos
  const isValidWeight =
    weight &&
    weight.imperial &&
    weight.metric &&
    !isNaN(parseFloat(weight.imperial)) &&
    !isNaN(parseFloat(weight.metric));

  // Obtiene la URL de la imagen
  const imageUrl = `${process.env.URL_API}/images/${img}.jpg`;
 

  return (
    <div className={styles.caja}>
      <div className={styles.container}>
        <Link to={`/detail/${id}`} className={styles.link}>
          <h2 className={styles.name}>
            {" "}
            <FontAwesomeIcon icon={faPaw} /> {name}
          </h2>
          {img ? (
            <img
              className={styles.img}
              src={imageUrl}
              alt={`Imagen de ${name}`}
            />
          ) : (
            <div className={styles.placeholder}>
              <p>Imagen no disponible</p>
            </div>
          )}
          <div className={styles.content}>
            {temperament ? (
              <p className={styles.temperamento}>
                <strong className={styles.text}> Temperamento:</strong>
                <br />{" "}
                {Array.isArray(temperament)
                  ? temperament.join(",")
                  : temperament}
              </p>
            ) : (
              <p className={styles.temperamento}>Temperamento no disponible</p>
            )}
            {!isValidWeight && (
              <p className={styles.no.disponible}>Peso no disponible</p>
            )}
          </div>
          {isValidWeight && (
            <p className={styles.weight}>
              <strong>Peso:</strong> {parseWeight(weight)}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}

export default DogCard;
