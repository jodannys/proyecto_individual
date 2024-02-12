const { Router } = require("express");
const getDogsByTemperament = require("../Controllers/getDogsByTemperament");
const searchDogsByName = require("../Controllers/searchDogsByName");
const getDogById = require("../Controllers/getDogById");
const createDog = require("../Controllers/createDog");
const getTemperaments = require("../Controllers/getTemperaments");
const createTemperament = require("../Controllers/createTemperament");
const router = Router();
// Obtener un listado de todas las razas de perro
router.get("/dogs", getDogsByTemperament);
// Buscar Razas de Perro por Nombre
router.get("/dogs/search", searchDogsByName);
// DETALLE DE UN PERRO
router.get("/dogs/:id", getDogById);
// OBTENER TEMPERAMENTOS
router.get("/temperaments", getTemperaments);
// CREACION DE PERRO
router.post("/createdog", createDog);
// CREACION DE TEMPERAMENTO
router.post("/createtemperament", createTemperament);

module.exports = router;
