const axios = require("axios");
const { Dog, Temperament } = require("../db");

//? Obtener un listado de las primeras 8 razas de perro
  

const getDogs1 = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const nuevoarray = response.data.slice(0, 8);
    res.send(nuevoarray);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

//? Obtener todas las razas de perro de la API

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

//?  Obtener todas las razas de perro de la API

const getSearch = async (req, res) => {
  try {
    console.log("Iniciando búsqueda de perros...");
    const misperros = await Dog.findAll();
    console.log("Perros encontrados en la base de datos:", misperros.length);

    const misperrosParse = [];
    for (let i = 0; i < misperros.length; i++) {
      let perrito = misperros[i];
      const temperaments = await perrito.getTemperaments();
      perrito = perrito.dataValues;
      perrito.temperament = temperaments
        .map((el) => el.dataValues.name)
        .toString();
      misperrosParse.push(perrito);
    }
    console.log("Perros parseados:", misperrosParse.length);

    const response = await axios.get(process.env.API_URL);
    console.log("Respuesta de la API externa recibida:", response.data);

    const queryName = req.query.name ? req.query.name.toLowerCase() : ""; // aui estoy Verificando si req.query.name está definido
    const resultado = [...misperrosParse, ...response.data].filter((el) =>
      el.name.toLowerCase().includes(queryName)
    );

    if (resultado.length === 0) {
      res.send([]);
    } else if (resultado.length > 8) {
      res.send(resultado.slice(0, 8));
    } else {
      res.send(resultado);
    }
  } catch (error) {
    console.log("Error en la búsqueda de perros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

//? Obtener temperamentos

const getTemperamentos = async (req, res) => {
  try {
    let traertemperamentos = await Temperament.findAll();
    traertemperamentos = JSON.stringify(traertemperamentos, null, 2);
    traertemperamentos = JSON.parse(traertemperamentos);
    if (traertemperamentos.length !== 0) {
      res.send(traertemperamentos);
    } else {
      const response = await axios.get(process.env.API_URL);
      let temperamentosfinal = [];
      let temperamentos = response.data.map((el) => el.temperament);
      let nuevostemperamentos = temperamentos
        .map((el) => el && el.split(","))
        .flat();
      nuevostemperamentos.forEach((el) => {
        if (temperamentosfinal.indexOf(el) < 0) temperamentosfinal.push(el);
      });
      for (let i = 0; i < 5; i++) {
        await Temperament.create({
          name: temperamentosfinal[i],
        });
      }
      res.send(temperamentosfinal.slice(9, 19));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};
module.exports = {
  getDogs1,
  getSearch,
  getTemperamentos,
  getDogs,
};
