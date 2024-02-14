const express = require("express");
const { Dog, Temperament} = require("../db");
const UserBd = require("../controllers/UserBd")


//? Esta ruta permite la creación de un nuevo perro.

const postCreatedog = (req, res) => {
  let temperamentsId = req.body.temperamentsId;
  Dog.create({
    name: req.body.perroNuevo.name,
    altura: req.body.perroNuevo.altura,
    peso: req.body.perroNuevo.peso,
    años: req.body.perroNuevo.años,
    id: Date.parse(new Date()),
  })
    .then((dog) => {
      dog.setTemperaments(temperamentsId);
      res.status(200).send(dog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    });
};

//? Esta ruta permite la creación de un nuevo temperamento.

const postCreatetemperament = (req, res) => {
  Temperament.create({
    name: req.body.temperamentonuevo,
    id: Date.parse(new Date()),
  })
    .then((temperament) => {
      res.send(temperament.dataValues);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    });
};


const createUser= async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const response = await UserBd(id, name, email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCreatedog,
  postCreatetemperament,
  createUser
};
