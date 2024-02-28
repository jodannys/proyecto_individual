const express = require("express");
const {
  getDogs1,
  getDogs,
  getSearch,
  getTemperamentos,
  getDetail,
  getsearchDogs,
  getTemperamentosBd,
  
} = require("../handlers/getHandlers");
const getRouter = express.Router();

// Obtener un listado de las primeras 8 razas de perro
getRouter.get("/dogs1", getDogs1);

// Obtener todas las razas de perro de la API
getRouter.get("/dogs", getDogs);

// Obtener todas las razas de perro de la API
getRouter.get("/search", getSearch);

// Obtener temperamentos
getRouter.get("/temperamentos", getTemperamentos);

// Obtener detalles del perro
getRouter.get("/dogs/:id", getDetail);

// Obtener perros de la base de datos
getRouter.get("/perros", getsearchDogs);

// Obtener perros de la base de datos con los temperamentos
getRouter.get("/perros/:id/temperamentos", getTemperamentosBd );


module.exports = getRouter;
