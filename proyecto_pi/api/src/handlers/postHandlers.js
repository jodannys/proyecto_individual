const express = require("express");
const { Dog, Temperament } = require("../db");

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
module.exports = {
  postCreatedog,
  postCreatetemperament,
};
