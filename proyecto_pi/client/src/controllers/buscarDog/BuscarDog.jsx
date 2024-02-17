
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import DogCard from "../dogCard/DogCard";
import DogPaginacion from "../dogPaginacion/DogPaginacion";

function BuscarDog() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag, setItemsPorPag] = useState(4);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperamentos`)
      .then((res) => {
        dispatch({
          type: "ADD_TEMPERAMENTS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3001/dogs`)
      .then((res) => {
        dispatch({
          type: "ADD_DOGS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderDogCards = () => {
    const indexDelUltimoItem = currentPage * itemsPorPag;
    const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;

    return dogs
      .slice(indexDelPrimerItem, indexDelUltimoItem)
      .map((dog) => (
        <DogCard
          key={dog.id}
          img={dog.reference_image_id} // Ajustar a la propiedad correcta de la imagen
          name={dog.name}
          temperament={dog.temperament}
          id={dog.id}
        />
      ));
  };

  return (
    <div className="fondo-buscar">
      <div>
        <div>
          <SearchBar />
          <div>
            <Link to="/dogAgregar">
              <button className="boton-agregar-perro">Agregar perro</button>
            </Link>
          </div>
        </div>
        {/* Resto del contenido omitido por brevedad */}
      </div>
      <div className="dogs-container">
        {dogs.length > 0 ? renderDogCards() : <p>No hay perros disponibles.</p>}
      </div>
      <div>
        <DogPaginacion
          itemsPorPag={itemsPorPag}
          totalPosts={dogs.length}
          paginate={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default BuscarDog;
