import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./DogDetail.css";
import { useSelector } from "react-redux";

function DogDetail() {
  const temperaments = useSelector((state) => state.temperaments);
  const [dogDetail, setDogDetail] = useState({
    name: "",
    temperament: "",
    peso: "",
    años_vida: "",
    altura: "",
    imagen: "",
    imagenUrl:"",
  });
  let { id } = useParams();

  useEffect(() => {
    traerDetalles();
  }, []);

  const traerDetalles = () => {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((res) => {
        console.log(res);
        setDogDetail({
          name: res.data.name,
          temperament: res.data.temperament || res.data.temperamento,
          altura: res.data.height?.metric || res.data.altura || "desconocida",
          peso: res.data.weight?.metric || res.data.peso || "desconocida",
          años_vida: res.data.life_span || res.data.años_vida || "desconocida",
          imagen: `https://cdn2.thedogapi.com/images/${res.data.reference_image_id}.jpg`,
          imagenUrl: res.data.imagenURL,
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
        src={dogDetail.imagen}
        alt={`Imagen de ${dogDetail.name}`}
      />

      <div className="descripcion-perro">
        <h2 className="nombre-id">
          {" "}
          {`Detalles de ${dogDetail.name} Id: ${id}`}
        </h2>
        <div>
          {" "}
          <p className="descripcion">¡Hola! soy un adorable {dogDetail.name}</p>
          <p className="descripcion">
            Mis temperamentos son una mezcla de <br /> {dogDetail.temperament}
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
            de vida promedio de {dogDetail.años_vida}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
