const express = require("express");
const {
  postCreatedog,
  postCreatetemperament,
} = require("../handlers/postHandlers");

const postRouter = express.Router();
// ruta d ecrear perros 
postRouter.post("/createdog", postCreatedog);

//ruta para crear temperamentos 
postRouter.post("/createtemperament", postCreatetemperament);

module.exports = postRouter;
