
// export const addTemperaments = (temperaments) => ({
//   type: "ADD_TEMPERAMENTS",
//   payload: temperaments,
// });

// // Acción para filtrar perros por temperamento
// export const filtrarPorTemperamento = (temperament) => ({
//   type: "FILTRAR_POR_TEMPERAMENTO",
//   payload: temperament,
// });

// // Acción para agregar razas al estado
// export const addRazas = (razas) => ({
//   type: "ADD_RAZAS",
//   payload: razas,
// });

// // Acción para buscar perros y actualizar la lista
// export const searchDogs = (dogs) => ({
//   type: "SEARCH_DOGS",
//   payload: dogs,
// });

// // Acción para agregar perros al estado
// export const addDogs = (dogs) => ({
//   type: "ADD_DOGS",
//   payload: dogs,
// });

// // Acciones para ordenar perros por peso
// export const ordenarLivianoPesado = () => ({
//   type: "ordenar-liviano-pesado",
// });

// export const ordenarPesadoLiviano = () => ({
//   type: "ordenar-pesado-liviano",
// });

// // Acciones para ordenar perros alfabéticamente
// export const ordenarAscendente = () => ({
//   type: "ordenar-asc-desc",
// });

// export const ordenarDescendente = () => ({
//   type: "ordenar-desc-asc",
// });

// // Acción para resetear todos los filtros
// export const resetFilters = () => ({
//   type: "RESET_FILTERS",
// });


import axios from "axios";

export const addTemperaments = (temperaments) => ({
  type: "ADD_TEMPERAMENTS",
  payload: temperaments,
});

// Acción para filtrar perros por temperamento
export const filtrarPorTemperamento = (temperament) => ({
  type: "FILTRAR_POR_TEMPERAMENTO",
  payload: temperament,
});

// Acción para agregar razas al estado
export const addRazas = (razas) => ({
  type: "ADD_RAZAS",
  payload: razas,
});

// Acción para buscar perros y actualizar la lista
export const searchDogs = (dogs) => ({
  type: "SEARCH_DOGS",
  payload: dogs,
});

// Acción para agregar perros al estado
export const addDogs = (dogs) => ({
  type: "ADD_DOGS",
  payload: dogs,
});

// Acciones para ordenar perros por peso
export const ordenarLivianoPesado = () => ({
  type: "ordenar-liviano-pesado",
});

export const ordenarPesadoLiviano = () => ({
  type: "ordenar-pesado-liviano",
});

// Acciones para ordenar perros alfabéticamente
export const ordenarAscendente = () => ({
  type: "ordenar-asc-desc",
});

export const ordenarDescendente = () => ({
  type: "ordenar-desc-asc",
});

// Acción para resetear todos los filtros
export const resetFilters = () => ({
  type: "RESET_FILTERS",
});

export const addDogsFromApi = (dogs) => ({
  type: "ADD_DOGS_FROM_API",
  payload: dogs,
});

export const addDogsFromDatabase = (dogs) => ({
  type: "ADD_DOGS_FROM_DATABASE",
  payload: dogs,
});

export const fetchDogsFromApi = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      dispatch(addDogsFromApi(response.data));
    } catch (error) {
      console.error("Error fetching dogs from API:", error);
    }
  };
};

export const fetchDogsFromDatabase = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/perros");
      dispatch(addDogsFromDatabase(response.data));
    } catch (error) {
      console.error("Error fetching dogs from database:", error);
    }
  };
};
