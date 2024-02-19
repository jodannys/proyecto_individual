// import axios from "axios";

// // Acción para buscar perros por nombre
// // export const searchDogs = (name) => async (dispatch) => {
// //     try {
// //         const res = await axios.get(`http://localhost:3001/search?name=${name}`);
// //         if (res.data.length === 0) {
// //             alert("No se encontró el perro");
// //         } else {
// //             dispatch({
// //                 type: "SEARCH_DOGS",
// //                 payload: res.data,
// //             });
// //         }
// //     } catch (error) {
// //         console.error(error);
// //         alert("No se encontró el perro");
// //     }
// // };
// // Acción para buscar perros por nombre
// export const searchDogs = (name) => async (dispatch) => {
//     try {
//         const res = await axios.get(`http://localhost:3001/search?name=${name}`);
//         if (res.data.length === 0) {
//             // Manejar caso donde no se encuentra el perro buscado
//             alert("El perro buscado no está disponible");
//         } else {
//             dispatch({
//                 type: "SEARCH_DOGS_SUCCESS",
//                 payload: res.data,
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         // Manejar errores de red u otros errores inesperados
//         alert("Ocurrió un error al buscar el perro");
//     }
// };

// // Acción para cargar los temperamentos
// export const loadTemperaments = () => async (dispatch) => {
//     try {
//         const res = await axios.get("http://localhost:3001/temperamentos");
//         dispatch({
//             type: "ADD_TEMPERAMENTS",
//             payload: res.data,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Acción para cargar las razas de perros
// export const loadDogBreeds = () => async (dispatch) => {
//     try {
//         const res = await axios.get("http://localhost:3001/dogs");
//         dispatch({
//             type: "ADD_DOGS",
//             payload: res.data,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Acción para ordenar perros de manera ascendente por peso
// export const orderLightToHeavy = () => ({
//     type: "ordenar-liviano-pesado",
// });

// // Acción para ordenar perros de manera descendente por peso
// export const orderHeavyToLight = () => ({
//     type: "ordenar-pesado-liviano",
// });

// // Acción para ordenar perros alfabéticamente de A-Z
// export const sortAlphabeticallyAsc = () => ({
//     type: "ordenar-asc-desc",
// });

// // Acción para ordenar perros alfabéticamente de Z-A
// export const sortAlphabeticallyDesc = () => ({
//     type: "ordenar-desc-asc",
// });
// actions.js
export const filterByTemperament = (temperament) => ({
  type: "FILTRAR_POR_TEMPERAMENTO",
  payload: temperament,
});

export const fetchDogsSuccess = (dogs) => ({
    type: "FETCH_DOGS_SUCCESS",
    payload: dogs,
  });
  export const fetchRazasSuccess = (razas) => ({
    type: "ADD_RAZAS",
    payload: razas,
  });
  
  export const fetchDogByIdSuccess = (dog) => ({
    type: "FETCH_DOG_BY_ID_SUCCESS",
    payload: dog,
  });
  
  export const fetchDogByNameSuccess = (dogs) => ({
    type: "FETCH_DOGS_BY_NAME_SUCCESS",
    payload: dogs,
  });
  
  export const addDogSuccess = (dog) => ({
    type: "ADD_DOG_SUCCESS",
    payload: dog,
  });
  
  export const fetchTemperamentsSuccess = (temperaments) => ({
    type: "FETCH_TEMPERAMENTS_SUCCESS",
    payload: temperaments,
  });
  
  
  export const setError = (error) => ({
    type: "SET_ERROR",
    payload: error,
  });
