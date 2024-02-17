const express = require("express");
const { Dog, Temperament, User } = require("../db");
const UserBd = require("../controllers/UserBd");
const loginUser = require("../controllers/LoginUser");
const bcrypt = require("bcrypt");

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
//? Esta ruta permite la creación de un nuevo usuario.

const createUser = async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos con la contraseña encriptada
    const newUser = await User.create({
      id,
      name,
      email,
      password: hashedPassword, // Almacenar la contraseña encriptada
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//? Esta ruta permite el inicio de seccion.

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // Si falta el correo electrónico o la contraseña en el cuerpo de la solicitud
      throw new Error("Se requiere un correo electrónico y una contraseña.");
    }

    const user = await loginUser({ email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  postCreatedog,
  postCreatetemperament,
  createUser,
  login,
};
