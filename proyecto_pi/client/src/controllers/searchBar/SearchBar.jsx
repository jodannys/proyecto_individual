// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import "./searchBar.css";

// function SearchBar() {
//   const dispatch = useDispatch();
//   const [buscar, setBuscar] = useState("");

//   const handleChange = (e) => {
//     setBuscar(e.target.value);
//   };

//   const handleSearch = () => {
//     if (!buscar.trim()) {
//       alert("Por favor ingresa el nombre del perro a buscar");
//       return;
//     }
//     // Corrige la URL del endpoint aquí
//     axios
//       .get(`http://localhost:3001/search?name=${buscar}`)
//       .then((res) => {
//         if (res.data.length === 0) {
//           alert("No se encontró el perro");
//         } else {
//           dispatch({
//             type: "SEARCH_DOGS",
//             payload: res.data,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Ocurrió un error al buscar el perro");
//       });
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="search-bar">
//       <input
//         className="search-input"
//         placeholder="Buscar perros"
//         value={buscar}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//       />
//       <button className="search-button" onClick={handleSearch}>
//         Buscar
//       </button>
//     </div>
//   );
// }

// export default SearchBar;



// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import "./searchBar.css";

// function SearchBar() {
//   const dispatch = useDispatch();
//   const [buscar, setBuscar] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleChange = (e) => {
//     setBuscar(e.target.value);
//   };

//   const handleSearch = () => {
//     if (!buscar.trim()) {
//       alert("Por favor ingresa el nombre del perro a buscar");
//       return;
//     }
//     // Realiza la solicitud al servidor
//     axios
//       .get(`http://localhost:3001/search?name=${buscar}`)
//       .then((res) => {
//         // Verifica si la respuesta contiene datos
//         if (res.data.length === 0) {
//           alert("No se encontró el perro");
//         } else {
//           // Actualiza el estado con los resultados de búsqueda
//           setSearchResults(res.data);
//           // Dispatch para actualizar el estado global si es necesario
//           dispatch({
//             type: "SEARCH_DOGS",
//             payload: res.data,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Ocurrió un error al buscar el perro");
//       });
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="search-bar">
//       <input
//         className="search-input"
//         placeholder="Buscar perros"
//         value={buscar}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//       />
//       <button className="search-button" onClick={handleSearch}>
//         Buscar
//       </button>
//       {/* Muestra los resultados de la búsqueda */}
//       {searchResults.length > 0 && (
//         <div className="search-results">
//           <h3>Resultados de la búsqueda:</h3>
//           <ul>
//             {searchResults.map((dog) => (
//               <li key={dog.id}>{dog.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;


import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./searchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [buscar, setBuscar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  const handleSearch = () => {
    console.log("Realizando búsqueda...");
    if (!buscar.trim()) {
      alert("Por favor ingresa el nombre del perro a buscar");
      return;
    }
    // Realiza la solicitud al servidor
    axios
      .get(`http://localhost:3001/search?name=${buscar}`)
      .then((res) => {
        console.log("Respuesta del servidor:", res);
        // Verifica si la respuesta contiene datos
        if (res.data.length === 0) {
          alert("No se encontró el perro");
        } else {
          // Actualiza el estado con los resultados de búsqueda
          setSearchResults(res.data);
          // Dispatch para actualizar el estado global si es necesario
          dispatch({
            type: "SEARCH_DOGS",
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        console.error("Error al buscar el perro:", error);
        alert("Ocurrió un error al buscar el perro");
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="Buscar perros"
        value={buscar}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
      {/* Muestra los resultados de la búsqueda */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Resultados de la búsqueda:</h3>
          <ul>
            {searchResults.map((dog) => (
              <li key={dog.id}>{dog.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

