const axios = require("axios");
const { Dog, Temperament } = require("../db");

// Obtener un listado de las primeras 8 razas de perro
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

// Obtener todas las razas de perro de la API
const getDogs = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Definir la ruta para obtener todos los detalles de los perros
const getDetail = async function (req, res) {
  try {
    console.log("Iniciando búsqueda del detalle del perro...");
    // Buscar el perro en la base de datos local
    let detallesDog = await Dog.findByPk(req.params.id, {
      include: Temperament,
    });

    if (!detallesDog) {
      console.log("ID del perro:", req.params.id);
      const response = await axios.get(
        `${process.env.API_URL}/${req.params.id}`
      );

      if (response.data.error) {
        console.log(response.data.error);
        return res.status(404).json({ error: "Perro no encontrado en la API" });
      } else {
        return res.json(response.data);
      }
    } else {
      console.log("Perro encontrado en la base de datos local:", detallesDog);
      return res.json(detallesDog);
    }
  } catch (error) {
    console.error("Error al obtener el detalle del perro:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//  Ruta patra obtener todas las razas de perro de la API
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

    const queryName = req.query.name ? req.query.name.toLowerCase() : "";
    const resultado = [...misperrosParse, ...response.data].filter((el) =>
      el.name.toLowerCase().includes(queryName)
    );
    // Envio los resultados al cliente
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
const getTemperamentosBd = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID no proporcionado' });
    }
    const dog = await Dog.findByPk(id, { include: 'temperaments' }); 
    if (!dog) {
      return res.status(404).json({ message: 'Perro no encontrado' });
    }
    const temperaments = await dog.getTemperaments(); 
    res.json(temperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getTemperamentos = 
async (req, res) => {
  try {
    const temperamentosDB = await Temperament.findAll();

    if (temperamentosDB.length !== 0) {
      res.send(temperamentosDB);
    } else {
      const response = await axios.get(process.env.API_URL);

      let temperamentosSet = new Set();

      response.data.forEach((el) => {
        if (el.temperament) {
          el.temperament.split(",").forEach((temperamento) => {
            temperamentosSet.add(temperamento.trim());
          });
        }
      });

      // Convertir el Set a un array de temperamentos únicos
      const temperamentosUnicos = Array.from(temperamentosSet);

      const temperamentosConId = temperamentosUnicos.map(temperamento => ({
        name: temperamento
      }));
      

      // Guardar los temperamentos en la base de datos local
      await Promise.all(temperamentosConId.map(async (temperamento) => {
        await Temperament.create(temperamento);
      }));

      res.send(temperamentosConId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

const getsearchDogs = async (req, res) => {
  try {
    const perrosFromDB = await Dog.findAll({
      attributes: ["imagenURL", "id", "name", "altura", "peso", "años_vida"],
    });

    if (perrosFromDB.length > 0) {
      res.json(perrosFromDB);
      return;
    }

    const response = await axios.get(process.env.API_URL);
    const perrosFromAPI = response.data;

    res.json(perrosFromAPI);
  } catch (error) {
    console.error("Error al buscar perros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getDogs1,
  getSearch,
  getTemperamentos,
  getDogs,
  getDetail,
  getsearchDogs,
  getTemperamentosBd,
};
