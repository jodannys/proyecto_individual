

const initialState = {
  dogs: [],
  temperaments: [],
  razas: [],
  dogsFromApi: [],
  dogsFromDatabase: [],
  searchResults: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "FILTRAR_POR_TEMPERAMENTO":
      return {
        ...state,
        dogs: state.dogsFromDatabase.filter(
          (dog) => dog.temperament && dog.temperament.includes(action.payload)
        ),
      };

    case "AGREGAR_DOG":
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };

    // Agrega las razas de perros al estado de la aplicación.
    case "ADD_RAZAS":
      return {
        ...state,
        razas: action.payload,
      };
    //Filtra los perros en el estado por una raza específica.
    case "FILTRAR_POR_RAZA":
      return {
        ...state,
        dogs: state.dogsFromDatabase.filter(
          (dog) => dog.raza === action.payload
        ),
      };
  
      case "SEARCH_DOGS_BY_NAME": // Corregir el tipo de acción
      return {
        ...state,
        searchResults: action.payload, // Actualizar los resultados de la búsqueda por nombre
      };
    case "ADD_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
      case 'ORDENAR_LIVIANO_PESADO':
      return {
        ...state,
        dogsFromApi: state.dogsFromApi.slice().sort((a, b) => parseFloat(a.weight.metric) - parseFloat(b.weight.metric))
      };
    case 'ORDENAR_PESADO_LIVIANO':
      return {
        ...state,
        dogsFromApi: state.dogsFromApi.slice().sort((a, b) => parseFloat(b.weight.metric) - parseFloat(a.weight.metric))
      };

    case "ORDENAR_ASCENDENTE_DESCENDENTE":
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

    case "ORDENAR_DESCENDENTE_ASCENDENTE":
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
      case "ADD_DOGS_FROM_API":
  return {
    ...state,
    dogsFromApi: action.payload,
  };

case "ADD_DOGS_FROM_DATABASE":
  return {
    ...state,
    dogsFromDatabase: action.payload,
  };

  case "RESET_FILTERS":
      return {
        ...state,
        dogs: [],
        searchResults: [],
        peso: "",
      }

    default:
      return state;
  }
}

export default Reducer;
