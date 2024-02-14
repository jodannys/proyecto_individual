const express = require("express");

const {
  getDogs1,
  getDogs,
  getSearch,
  getTemperamentos,
} = require("../handlers/getHandlers");
const getRouter = express.Router();

//? Obtener un listado de las primeras 8 razas de perro
getRouter.get("/dogs1", getDogs1);

//? Obtener todas las razas de perro de la API
getRouter.get("/dogs", getDogs);

//? Obtener todas las razas de perro de la API
getRouter.get("/search", getSearch);

//? Obtener temperamentos
getRouter.get("/temperamentos", getTemperamentos);

module.exports = getRouter;
