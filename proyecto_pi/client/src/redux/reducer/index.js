// // reducers/index.js

// import { combineReducers } from 'redux';
// import { actionTypes } from '../actions/index'; // Supongamos que tienes un archivo actionTypes.js donde defines tus tipos de acciones

// // Reducer para el estado de usuarios
// const usersReducer = (state = [], action) => {
//   switch (action.type) {
//     case actionTypes.ADD_USER:
//       return [...state, action.payload];
//     case actionTypes.REMOVE_USER:
//       return state.filter(user => user.id !== action.payload);
//     default:
//       return state;
//   }
// };

// // Reducer para el estado de productos
// const productsReducer = (state = [], action) => {
//   switch (action.type) {
//     case actionTypes.ADD_PRODUCT:
//       return [...state, action.payload];
//     case actionTypes.REMOVE_PRODUCT:
//       return state.filter(product => product.id !== action.payload);
//     default:
//       return state;
//   }
// };

// // Combinar todos los reducers en un único reducer raíz
// const rootReducer = combineReducers({
//   users: usersReducer,
//   products: productsReducer
// });

// export default rootReducer;
