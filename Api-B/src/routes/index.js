const { Router } = require('express');
const getAllDogs = require("../controllers/getAllDogs");
const getDogsByName = require("../controllers/getDogsByName");
const getDogById = require("../Controllers/getDogById");
const getTemperaments = require("../Controllers/getTemperaments");
const createDog = require("../controllers/createDogs");

const router = Router();
router.get("/dogs", getAllDogs);
router.get("/dogs/name", getDogsByName);
router.get("/dogs/:idRaza", getDogById);
router.get("/temperaments", getTemperaments);
router.post("/dogs", createDog);

module.exports = router;


