const initialState = {
  dogs: [],
  temperaments: [],
  razas: [],
  dogsFromApi: [],
  dogsFromDatabase: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TEMPERAMENTS":
      // Agrega los temperamentos al estado
      return {
        ...state,
        temperaments: action.payload,
      };
    case "FILTRAR_POR_TEMPERAMENTO":
      return {
        ...state,
        dogs: state.dogs.filter((dog) =>
          dog.temperament.includes(action.payload)
        ),
      };
    case "ADD_RAZAS":
      return {
        ...state,
        razas: action.payload,
      };
    case "SEARCH_DOGS":
      // Actualiza la lista de perros con los resultados de la búsqueda
      return {
        ...state,
        dogs: action.payload,
      };
    case "ADD_DOGS":
      // Agrega las razas de perros al estado
      return {
        ...state,
        dogs: action.payload,
      };
    case "ordenar-liviano-pesado":
      // Ordena los perros de manera ascendente por peso
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(a.weight.metric.slice(0, 3)) -
            parseInt(b.weight.metric.slice(0, 3))
        ),
      };
    case "ordenar-pesado-liviano":
      // Ordena los perros de manera descendente por peso
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(b.weight.metric.slice(0, 3)) -
            parseInt(a.weight.metric.slice(0, 3))
        ),
      };
    case "ordenar-asc-desc":
      // Ordena los perros alfabéticamente de A-Z
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
    case "ordenar-desc-asc":
      // Ordena los perros alfabéticamente de Z-A
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
      // Reinicia todos los filtros al estado inicial
      return initialState;
    default:
      return state;
  }
}

export default Reducer;

// const initialState = {
//   dogs: [],
//   temperaments: [],
//   razas: [],
// };

// function Reducer(state = initialState, action) {
//   switch (action.type) {
//     case "ADD_TEMPERAMENTS":
//       // Agrega los temperamentos al estado
//       return {
//         ...state,
//         temperaments: action.payload,
//       };
//     case "FILTRAR_POR_TEMPERAMENTO":
//       return {
//         ...state,
//         dogs: state.dogs.filter((dog) =>
//           dog.temperament.includes(action.payload)
//         ),
//       };
//       case "ADD_RAZAS":
//         return {
//           ...state,
//           razas: action.payload,
//         };

//     case "SEARCH_DOGS":
//       // Actualiza la lista de perros con los resultados de la búsqueda
//       return {
//         ...state,
//         dogs: action.payload,
//       };

//       case "ADD_DOGS":
//         // Agrega las razas de perros al estado
//       return {
//         ...state,
//         dogs: action.payload,
//       };
//     case "ordenar-liviano-pesado":
//       // Ordena los perros de manera ascendente por peso
//       return {
//         ...state,
//         dogs: state.dogs.sort(
//           (a, b) =>
//             parseInt(a.weight.metric.slice(0, 3)) -
//             parseInt(b.weight.metric.slice(0, 3))
//         ),
//       };
//     case "ordenar-pesado-liviano":
//       // Ordena los perros de manera descendente por peso
//       return {
//         ...state,
//         dogs: state.dogs.sort(
//           (a, b) =>
//             parseInt(b.weight.metric.slice(0, 3)) -
//             parseInt(a.weight.metric.slice(0, 3))
//         ),
//       };
//     case "ordenar-asc-desc":
//       // Ordena los perros alfabéticamente de A-Z
//       return {
//         ...state,
//         dogs: state.dogs.sort((a, b) => {
//           if (a.name < b.name) {
//             return -1;
//           }
//           if (a.name > b.name) {
//             return 1;
//           }
//           return 0;
//         }),
//       };
//     case "ordenar-desc-asc":
//       // Ordena los perros alfabéticamente de Z-A
//       return {
//         ...state,
//         dogs: state.dogs.sort((a, b) => {
//           if (a.name > b.name) {
//             return -1;
//           }
//           if (a.name < b.name) {
//             return 1;
//           }
//           return 0;
//         }),
//       }
//     default:
//       return state;
//   }
// }
// export default Reducer;
