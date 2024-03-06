// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaw } from "@fortawesome/free-solid-svg-icons";
// import styles from "./SerchBar.module.css";
// import {
//   searchDogs
  
// } from "../../redux/actions";

// function SearchBar() {
//   const dispatch = useDispatch();
//   const buscar = useSelector((state) => state.buscar); 
//   const [searchResults, setSearchResults] = useState([]);

//   const handleChange = () => {
//     dispatch(searchDogs());
//   };
//   const searchTerm = buscar.trim();

//   const handleSearch = () => {
//     if (!buscar.trim()) {
//       alert("Por favor ingresa el nombre del perro a buscar");
//       return;
//     }
//     if (!/^[a-zA-Z\s]*$/.test(searchTerm)) {
//       alert("Por favor ingresa un nombre válido para buscar perros");
//       return;
//     }
//     axios
//       .get(`${process.env.SERVER_URL}/search?name=${buscar}`)
//       .then((res) => {
//         console.log("Respuesta del servidor:", res);
//         if (res.data.length === 0) {
//           alert("No se encontró el perro");
//         } else {
//           setSearchResults(res.data);
//           dispatch({
//             type: "SEARCH_DOGS",
//             payload: res.data,
//           });
//           setBuscar("");
//         }
//       })
//       .catch((error) => {
//         console.error("Error al buscar el perro:", error);
//         alert("Ocurrió un error al buscar el perro");
//       });
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSearch();
//     }
//   };
//   return (
//     <div className={styles.container}>
//       <input
//         className={styles.inputs}
//         placeholder="Buscar por nombre"
//         value={buscar}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//       />
//       <button className={styles.search} onClick={handleSearch}>
//         <FontAwesomeIcon icon={faPaw} />
//       </button>
//     </div>
//   );
// }

// export default SearchBar;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogsByName } from "../../redux/actions/index";

import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SerchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [buscar, setBuscar] = useState("");


  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log("Valor de buscar:", buscar);
    if (!buscar.trim()) {
      alert("Por favor ingresa el nombre del perro a buscar");
      return;
    }
    if (!/^[a-zA-Z\s]*$/.test(buscar.trim())) {
      alert("Por favor ingresa un nombre válido para buscar perros");
      return;
    }
    dispatch(searchDogsByName(buscar.trim()));
    console.log("Nombre del perro a buscar:", buscar.trim());
    setBuscar("");
  };

   return (
    <div className={styles.container}>
      <input
        className={styles.inputs}
        placeholder="Buscar por nombre"
        value={buscar}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.search} onClick={handleSearch}>
        <FontAwesomeIcon icon={faPaw} />
      </button>
    </div>
  );
}

export default SearchBar;
