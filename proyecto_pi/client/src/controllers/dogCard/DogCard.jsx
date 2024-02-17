

import React from "react";
import { Link } from "react-router-dom";
import "./DogCard.css";

function DogCard({ id, name, temperament, weight, img }) {
  return (
    <Link to={`/dogDetail/${id}`} className="card-link">
        <img className="img-dog" src={img} alt={`Imagen de ${name}`} />
        <div className="card-content">
          <h2 className="dog-name">{name}</h2>
          <p className="dog-temperament">
            <strong>Temperamento:</strong> {Array.isArray(temperament) ? temperament.join(", ") : temperament}
          </p>
          <p className="dog-weight">
            <strong>Peso:</strong> {weight} kg
          </p>
        </div>
    </Link>
  );
}

export default DogCard;
