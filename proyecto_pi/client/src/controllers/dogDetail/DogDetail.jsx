import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../dogDetail/DogDetail.css";
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
          fotoid: res.data.image?.url,
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
          <img className="img-perro" src={dogDetail.fotoid}></img>
        </div>
        <div className="descripcion-perro">
          <p>{dogDetail.name}</p>
          <div>
            <p>Temperamento: {dogDetail.temperament}</p>
            <p>Altura:{dogDetail.altura}</p>
            <p>Peso: {dogDetail.peso}</p>
            <p>Años de vida: {dogDetail.años}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
