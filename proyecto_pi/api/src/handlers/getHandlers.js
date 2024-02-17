const axios = require("axios");
const { Dog, Temperament, User } = require("../db");


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

    // Obtener perros de la base de datos local
    const misperros = await Dog.findAll();
    console.log("Perros encontrados en la base de datos:", misperros.length);

    // Parsear perros y obtener temperamentos
    const misperrosParse = [];
    for (let i = 0; i < misperros.length; i++) {
      let perrito = misperros[i];
      const temperaments = await perrito.getTemperaments();
      perrito = perrito.dataValues;
      perrito.temperament = temperaments.map((el) => el.dataValues.name).toString();
      misperrosParse.push(perrito);
    }
    console.log("Perros parseados:", misperrosParse.length);

    // Obtener perros de la API externa
    const response = await axios.get(process.env.API_URL);
    console.log("Respuesta de la API externa recibida:", response.data);

    // Filtrar resultados por nombre
    const queryName = req.query.name ? req.query.name.toLowerCase() : "";
    const resultado = [...misperrosParse, ...response.data].filter((el) =>
      el.name.toLowerCase().includes(queryName)
    );

    // Enviar resultados al cliente
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
      let temperamentosfinal = new Set(); // Utiliza un Set para almacenar los temperamentos únicos
      let temperamentos = response.data.map((el) => el.temperament);
      let nuevostemperamentos = temperamentos
        .map((el) => el && el.split(","))
        .flat();
      nuevostemperamentos.forEach((el) => {
        temperamentosfinal.add(el); // Agrega el temperamento al Set
      });
      // Limita el número de temperamentos guardados
      const temperamentosGuardados = Array.from(temperamentosfinal).slice(9, 19);
      for (const temperamento of temperamentosGuardados) {
        await Temperament.create({
          name: temperamento,
        });
      }
      res.send(temperamentosGuardados);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};



const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password // Asegúrate de incluir la contraseña
    };
  } catch (error) {
    throw new Error("Error al obtener usuario por correo electrónico: " + error.message);
  }
};




module.exports = {
  getDogs1,
  getSearch,
  getTemperamentos,
  getDogs,
  getUserByEmail 
};
