import axios from "axios";
const URL = process.env.SERVER_URL;

export const addTemperaments = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${URL}/temperamentos`);
      dispatch({
        type: "ADD_TEMPERAMENTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addDogs = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${URL}/dogs`);
      dispatch({
        type: "ADD_DOGS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addRazas = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${URL}/dogs`);
      dispatch({
        type: "ADD_RAZAS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filtrarPorRaza = (raza) => {
  return {
    type: "FILTRAR_POR_RAZA",
    payload: raza,
  };
};

export const searchDogsByName = (name) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.SERVER_URL}/search?name=${name}`);
      console.log("Datos recibidos del servidor:", res.data); // Agregar console.log para imprimir los datos recibidos del servidor
      if (res.data.length === 0) {
        alert("No se encontró el perro");
      } else {
        dispatch({
          type: "SEARCH_DOGS_BY_NAME", // Corregir el tipo de acción
          payload: res.data,
        });
      }
    } catch (error) {
      console.error("Error al buscar el perro:", error);
      alert("Ocurrió un error al buscar el perro");
    }
  };
};


export const addFromApi = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/dogs`);
      dispatch({
        type: "ADD_DOGS_FROM_API",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching dogs from API:", error);
    }
  };
};

export const addFromDatabase = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/perros`);
      dispatch({
        type: "ADD_DOGS_FROM_DATABASE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching dogs from database:", error);
    }
  };
};


export const ordenarLivianoPesado = () => ({
  type: "ORDENAR_LIVIANO_PESADO",
});

export const ordenarPesadoLiviano = () => ({
  type: "ORDENAR_PESADO_LIVIANO",
});

// Resto de tus acciones existentes

export const ordenarAscendenteDescendente = () => ({
  type: "ORDENAR_ASCENDENTE_DESCENDENTE",
});

export const ordenarDescendenteAscendente = () => ({
  type: "ORDENAR_DESCENDENTE_ASCENDENTE",
});

export const resetFilters = () => ({
  type: "RESET_FILTERS",
});


export const filtrarPorTemperamento = (temperament) => ({
  type: "FILTRAR_POR_TEMPERAMENTO",
  payload: temperament,
});
