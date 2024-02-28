const initialState = {
  dogs: [],
  temperaments: [],
  razas: [],
  dogsFromApi: [],
  dogsFromDatabase: [],
};
// Agrega los temperamentos al estado
function Reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    //Filtra los perros en el estado por un temperamento específico.
    case "FILTRAR_POR_TEMPERAMENTO":
      return {
        ...state,
        dogs: state.dogs.filter((dog) =>
          dog.temperament.includes(action.payload)
        ),
      };

    //Agrega las razas de perros al estado de la aplicación.
    case "ADD_RAZAS":
      return {
        ...state,
        razas: action.payload,
      };
    // Actualiza la lista de perros con los resultados de la búsqueda
    case "SEARCH_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    // Agrega las razas de perros al estado
    case "ADD_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
    // Ordena los perros de manera ascendente por peso
    case "ordenar-liviano-pesado":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(a.weight.metric.slice(0, 3)) -
            parseInt(b.weight.metric.slice(0, 3))
        ),
      };
    // Ordena los perros de manera descendente por peso
    case "ordenar-pesado-liviano":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(b.weight.metric.slice(0, 3)) -
            parseInt(a.weight.metric.slice(0, 3))
        ),
      };
    // Ordena los perros alfabéticamente de A-Z
    case "ordenar-asc-desc":
      return {
        ...state,
        dogs: state.dogs.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      };
    // Ordena los perros alfabéticamente de Z-A
    case "ordenar-desc-asc":
      return {
        ...state,
        dogs: state.dogs.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }),
      };
    //Agrega perros obtenidos de una API externa al estado de la aplicación.
    case "ADD_DOGS_FROM_API":
      return {
        ...state,
        dogsFromApi: action.payload,
      };
    //Agrega perros obtenidos de la base de datos al estado de la aplicación.
    case "ADD_DOGS_FROM_DATABASE":
      return {
        ...state,
        dogsFromDatabase: action.payload,
      };
    // Reinicia todos los filtros al estado inicial
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
}

export default Reducer;
