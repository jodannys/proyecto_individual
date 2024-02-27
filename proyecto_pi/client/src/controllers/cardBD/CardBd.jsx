import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
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
        const response = await fetch(
          `http://localhost:3001/perros/${id}/temperamentos`
        );
        if (!response.ok) {
          throw new Error(
            "Error al obtener los temperamentos del perro"
          );
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
  }, [id]); // Añadir id como dependencia para que el efecto se ejecute cuando cambie el ID del perro

  return (
    <div className="caja">
      <div className="card-container-card">
        <Link to={`/detailBd/${id}`} className="card-link">
          {/* <p>ID: {id}</p> */}
          <h2 className="dog-name">
            {" "}
            <FontAwesomeIcon icon={faPaw} /> {name}
          </h2>
          {imagenURL ? (
            <img
              className="img-dog"
              src={imagenURL}
              alt={`Imagen de ${name}`}
            />
          ) : (
            <div className="img-dog-placeholder">
              <p>Imagen no disponible</p>
            </div>
          )}

          <div className="card-content">
            <p className="temperamento-card">
              <strong className="text"> Temperamento:</strong>
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
              <p className="dato-no-disponible">Peso no disponible</p>
            )}
          </div>
          {peso && (
            <p className="dog-weight">
              <strong>Peso:</strong> {parseWeight(peso)}
            </p>
          )}
        
        </Link>
      </div>
    </div>
  );
};

export default CardBd;
