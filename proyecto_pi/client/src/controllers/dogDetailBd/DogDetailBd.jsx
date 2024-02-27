import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./DogDetail.css";

function DogDetailBd() {
  const [dogDetail, setDogDetail] = useState({
    name: "",
    peso: "",
    años_vida: "",
    altura: "",
    imagenURL: "",
    
  });
  const { id } = useParams();

  useEffect(() => {
    traerDetalles();
  }, [id]);

  const traerDetalles = () => {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((res) => {
        console.log(res);
        const { name, temperaments, altura, peso, años_vida, imagenURL } = res.data;
        setDogDetail({
          name: name || "",
          temperament: temperaments?.map(temperament => temperament.name).join(", ") || "",
          altura: altura || "",
          peso: peso || "",
          años_vida: años_vida || "",
          imagenURL: imagenURL || "",
          


        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="detail">
      <img
        className="img"
        src={dogDetail.imagenURL}
        alt={`Imagen de ${dogDetail.name}`}
      />

      <div className="descripcion-perro">
        <h2 className="nombre-id">
          {`Detalles de ${dogDetail.name} Id: ${id}`}
        </h2>
        <div>
          <p className="descripcion">¡Hola! Soy un adorable {dogDetail.name}</p>
          <p className="descripcion">
            Mis temperamentos son una mezcla de <br />
            {dogDetail.temperament}
          </p>
          <p className="descripcion">
            En cuanto a mi tamaño, <br />
            suelo medir entre {dogDetail.altura} centímetros de altura.
          </p>
          <p className="descripcion">
            Mi peso oscila típicamente entre {dogDetail.peso} kilogramos.
          </p>
          <p className="descripcion">
            Y lo mejor de todo es que tengo una esperanza <br />
            de vida promedio de {dogDetail.años_vida}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DogDetailBd;
