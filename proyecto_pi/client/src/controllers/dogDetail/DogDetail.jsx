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
    años: "",
    altura: "",
    fotoid: "",
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
          altura: res.data.height?.metric || res.data.altura,
          peso: res.data.weight?.metric || res.data.peso,
          años: res.data.life_span || res.data.años,
          // Utilizamos la misma lógica de obtención de la URL de la imagen que en DogCard
          fotoid: `https://cdn2.thedogapi.com/images/${res.data.reference_image_id}.jpg`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fondo-dog-detail">
      <div className="container-amarillo">
        <div className="container-img">
          {/* Utilizamos la URL de la imagen obtenida de la API */}
          <img className="img-dog" src={dogDetail.fotoid} alt={`Imagen de ${dogDetail.name}`} />
        </div>
        <div className="descripcion-perro">
          <div> <p>ID:{id}</p>
          <p>¡Hola! Soy un adorable {dogDetail.name}</p>
            <p>Mis temperamentos son una mezcla de {dogDetail.temperament}</p>
            <p>En cuanto a mi tamaño, suelo medir entre {dogDetail.altura} centímetros de altura.</p>
            <p>Mi peso oscila típicamente entre {dogDetail.peso} kilogramos.</p>
            <p>Y lo mejor de todo es que tengo una esperanza de vida promedio de {dogDetail.años}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
