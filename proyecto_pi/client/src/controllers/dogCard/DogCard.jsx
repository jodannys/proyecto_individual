// import React from "react";
// import { Link } from "react-router-dom";
// import "./DogCard.css";

// function DogCard({ id, name, temperament, weight, img }) {

//   const parseWeight = (weight) => {
//     if (weight && weight.imperial && weight.metric) {
//       const imperial = weight.imperial.split(" - ");
//       const metric = weight.metric.split(" - ");
//       return `${imperial[0]} - ${imperial[1]} lbs (${metric[0]} - ${metric[1]} kg)`;
//     } else {
//       return "Peso no disponible";
//     }
//   };

//   // Obtiene la URL de la imagen
//   const imageUrl = `https://cdn2.thedogapi.com/images/${img}.jpg`;

//   return (
//     <div className="card-container">
//       <Link to={`/detail/${id}`} className="card-link">
//         <p> ID:{id}</p>
//           <h2 className="dog-name">{name}</h2>
//         <img className="img-dog" src={imageUrl} alt={`Imagen de ${name}`} />
//         <div className="card-content">
//           <p className="temperamento-card">
//             <strong className="text">Temperamento: <br /> <br /> </strong>{" "}
//             {Array.isArray(temperament) ? temperament.join(",") : temperament}
//           </p>
//         </div>
//       </Link>
//           <p className="dog-weight">
//             <strong>Peso:</strong> {parseWeight(weight)}
//           </p>
//     </div>
//   );
// }

// export default DogCard;
import React from "react";
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
    <div className="card-container">
      <Link to={`/detail/${id}`} className="card-link">
        <p>ID: {id}</p>
        <h2 className="dog-name">{name}</h2>
        {img ? (
          <img className="img-dog" src={imageUrl} alt={`Imagen de ${name}`} />
        ) : (
          <p className="img-dog ">Imagen no disponible</p>
          )}
      
        <div className="card-content">
          {temperament ? (
            <p className="temperamento-card">
              <strong className="text">Temperamento:</strong>{" "}
              {Array.isArray(temperament) ? temperament.join(",") : temperament}
            </p>
          ) : (
            <p className="temperamento-card">Temperamento no disponible</p>
          )}
        {!isValidWeight && (
          <p className="dog-weight">Peso no disponible</p>
          )}
        </div>
          {isValidWeight && (
            <p className="dog-weight">
              <strong>Peso:</strong> {parseWeight(weight)}
            </p>
        )}
      </Link>
    </div>
  );
}

export default DogCard;
