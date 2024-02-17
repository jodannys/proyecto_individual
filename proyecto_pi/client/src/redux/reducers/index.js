// const initialState = {
//     dogs:[],
//     temperaments: [],
//     ochodogs: []
// }

// function Reducer(state = initialState, action) {
//     switch(action.type) {
//         case "SEARCH_DOGS_SUCCESS":
//             return {
//                 ...state,
//                 dogs: action.payload
//             };
//         case "ADD_TEMPERAMENTS":
//             return {
//                 ...state,
//                 temperaments: action.payload
//             };
//         case "ADD_BREEDS":
//             return {
//                 ...state,
//                 ochodogs: action.payload
//             }
//         case "ordenar-liviano-pesado":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a,b) => parseInt(a.weight.metric.slice(0, 3)) - parseInt(b.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-pesado-liviano":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a,b) => parseInt(b.weight.metric.slice(0, 3)) - parseInt(a.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-asc-desc":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort(function(a, b){
//                     if(a.name < b.name) { return -1; }
//                     if(a.name > b.name) { return 1; }
//                     return 0;
//                 })
//             }
//         case "ordenar-desc-asc":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort(function(a, b){
//                     if(a.name > b.name) { return -1; }
//                     if(a.name < b.name) { return 1; }
//                     return 0;
//                 })
//             }
//         default:
//             return state
// }
// }
// export default Reducer;

// // Reducer.js
// const initialState = {
//     dogs: [], // Cambiado el nombre de ochodogs a dogs para mayor coherencia
//     temperaments: [],
// };

// function Reducer(state = initialState, action) {
//     switch(action.type) {
//         case "SEARCH_DOGS_SUCCESS":
//             return {
//                 ...state,
//                 dogs: action.payload
//             };
//         case "ADD_TEMPERAMENTS":
//             return {
//                 ...state,
//                 temperaments: action.payload
//             };
//         case "ADD_DOGS": // Cambiado el nombre de ADD_BREEDS a ADD_DOGS para mayor coherencia
//             return {
//                 ...state,
//                 dogs: action.payload
//             };
//         case "ordenar-liviano-pesado":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => parseInt(a.weight.metric.slice(0, 3)) - parseInt(b.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-pesado-liviano":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => parseInt(b.weight.metric.slice(0, 3)) - parseInt(a.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-asc-desc":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => {
//                     if (a.name < b.name) { return -1; }
//                     if (a.name > b.name) { return 1; }
//                     return 0;
//                 })
//             };
//         case "ordenar-desc-asc":
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => {
//                     if (a.name > b.name) { return -1; }
//                     if (a.name < b.name) { return 1; }
//                     return 0;
//                 })
//             };
//         default:
//             return state;
//     }
// }
// // export default Reducer;
// const initialState = {
//     dogs: [],
//     temperaments: [],
// };

// function Reducer(state = initialState, action) {
//     switch(action.type) {
//         case "SEARCH_DOGS":
//             // Actualiza la lista de perros con los resultados de la búsqueda
//             return {
//                 ...state,
//                 dogs: action.payload
//             };
//         case "ADD_TEMPERAMENTS":
//             // Agrega los temperamentos al estado
//             return {
//                 ...state,
//                 temperaments: action.payload
//             };
//         case "ADD_DOGS":
//             // Agrega las razas de perros al estado
//             return {
//                 ...state,
//                 dogs: action.payload
//             };
//         case "ordenar-liviano-pesado":
//             // Ordena los perros de manera ascendente por peso
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => parseInt(a.weight.metric.slice(0, 3)) - parseInt(b.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-pesado-liviano":
//             // Ordena los perros de manera descendente por peso
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => parseInt(b.weight.metric.slice(0, 3)) - parseInt(a.weight.metric.slice(0, 3)))
//             };
//         case "ordenar-asc-desc":
//             // Ordena los perros alfabéticamente de A-Z
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => {
//                     if (a.name < b.name) { return -1; }
//                     if (a.name > b.name) { return 1; }
//                     return 0;
//                 })
//             };
//         case "ordenar-desc-asc":
//             // Ordena los perros alfabéticamente de Z-A
//             return {
//                 ...state,
//                 dogs: state.dogs.sort((a, b) => {
//                     if (a.name > b.name) { return -1; }
//                     if (a.name < b.name) { return 1; }
//                     return 0;
//                 })
//             };
//         default:
//             return state;
//     }
// }
// export default Reducer;

const initialState = {
  dogs: [],
  temperaments: [],
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
    default:
      return state;
  }
}
export default Reducer;
