const express = require("express");
const {
  postCreatedog,
  postCreatetemperament,
  createUser,
  login,
} = require("../handlers/postHandlers");

const postRouter = express.Router();

//?  Esta ruta permite la creación de un nuevo perro.
postRouter.post("/createdog", postCreatedog);

//? Esta ruta permite la creación de un nuevo temperamento.
postRouter.post("/createtemperament", postCreatetemperament);

postRouter.post("/user", createUser);

postRouter.post("/login", login);

module.exports = postRouter;
