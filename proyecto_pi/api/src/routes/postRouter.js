const express = require("express");
const {
  postCreatedog,
  postCreatetemperament,
} = require("../handlers/postHandlers");
const postRouter = express.Router();

//?  Esta ruta permite la creación de un nuevo perro.
postRouter.post("/createdog", postCreatedog);

//? Esta ruta permite la creación de un nuevo temperamento.
postRouter.post("/createtemperament", postCreatetemperament);

module.exports = postRouter;
