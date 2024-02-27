import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./DogCard.css";

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
  const imageUrl = `https://cdn2.thedogapi.com/images/${img}.jpg`;

  return (
    <div className="caja">
    <div className="card-container-card">
      <Link to={`/detail/${id}`} className="card-link">
        <h2 className="dog-name">
          {" "}
          <FontAwesomeIcon icon={faPaw} /> {name}
        </h2>
        {img ? (
          <img className="img-dog" src={imageUrl} alt={`Imagen de ${name}`} />
        ) : (
          <div className="img-dog-placeholder">
            <p>Imagen no disponible</p>
          </div>
        )}
        <div className="card-content">
          {temperament ? (
            <p className="temperamento-card">
              <strong className="text"> Temperamento:</strong>
              <br />{" "}
              {Array.isArray(temperament) ? temperament.join(",") : temperament}
            </p>
          ) : (
            <p className="temperamento-card">Temperamento no disponible</p>
          )}
          {!isValidWeight && <p className="dato-no-disponible">Peso no disponible</p>}
        </div>
        {isValidWeight && (
          <p className="dog-weight">
            <strong>Peso:</strong> {parseWeight(weight)}
          </p>
        )}
      </Link>
    </div>
    </div>
  );
}

export default DogCard;
