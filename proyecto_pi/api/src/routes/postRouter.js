const express = require("express");
const {
  createDog 
 
} = require("../handlers/postHandlers");

const postRouter = express.Router();
// ruta d ecrear perros 
postRouter.post("/createdog",createDog );

module.exports = postRouter;
