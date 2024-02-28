import axios from "axios";
const URL = process.env.SERVER_URL;

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
//Agrega perros obtenidos de una API externa al estado de la aplicación.
export const addDogsFromApi = (dogs) => ({
  type: "ADD_DOGS_FROM_API",
  payload: dogs,
});
//Agrega perros obtenidos de la base de datos al estado de la aplicación.
export const addDogsFromDatabase = (dogs) => ({
  type: "ADD_DOGS_FROM_DATABASE",
  payload: dogs,
});
// solicitud para obtener perros de una API externa y los agrega
//al estado de la aplicación.
export const fetchDogsFromApi = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/dogs`);
      dispatch(addDogsFromApi(response.data));
    } catch (error) {
      console.error("Error fetching dogs from API:", error);
    }
  };
};
//solicitud para obtener perros de la base de datos y
//  los agrega al estado de la aplicación.
export const fetchDogsFromDatabase = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/perros`);
      dispatch(addDogsFromDatabase(response.data));
    } catch (error) {
      console.error("Error fetching dogs from database:", error);
    }
  };
};
