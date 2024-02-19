const express = require("express");
const {
  postCreatedog,
  postCreatetemperament,
  createUser,
  login,
} = require("../handlers/postHandlers");

const postRouter = express.Router();

postRouter.post("/createdog", postCreatedog);
postRouter.post("/createtemperament", postCreatetemperament);
postRouter.post("/user", createUser);
postRouter.post("/login", login);

module.exports = postRouter;
