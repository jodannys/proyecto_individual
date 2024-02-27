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

//DETALLE DE UN PERRO
// const getDetail = async function (req, res) {
//   try {
//     console.log("Iniciando búsqueda del detalle del perro...");

//     // Buscar el perro en la base de datos local
//     let detallesDog = await Dog.findByPk(req.params.id, {
//       include: Temperament,
//     });

//     if (!detallesDog) {
//       // Si el perro no se encuentra en la base de datos local, realizar una solicitud a la API
//       console.log(
//         "Perro no encontrado en la base de datos local. Buscando en la API..."
//       );

//       console.log("ID del perro:", req.params.id);
//       axios
//       .get(`${process.env.API_URL}/${req.params.id}`)
//       .then((response) => {
//           if (response.data.error) {
//             // Si la API devuelve un error, enviar una respuesta con un error 404
//             console.log(response.data.error);
//             return res
//               .status(404)
//               .json({ error: "Perro no encontrado en la API" });
//           } else {
//             // Si se encuentra el perro en la API, enviar la respuesta
//             res.json(response.data);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           res
//             .status(500)
//             .json({ error: "Error interno del servidor al buscar en la API" });
//         });
//     } else {
//       console.log("Perro encontrado en la base de datos local:", detallesDog);
//       res.json(detallesDog);
//     }
//   } catch (error) {
//     console.error("Error al obtener el detalle del perro:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };



// Definir la ruta para obtener todos los detalles de los perros

const getDetail = async function (req, res) {
  try {
    console.log("Iniciando búsqueda del detalle del perro...");

    // Buscar el perro en la base de datos local
    let detallesDog = await Dog.findByPk(req.params.id, {
      include: Temperament,
    });

    if (!detallesDog) {
      // Si el perro no se encuentra en la base de datos local, realizar una solicitud a la API
      console.log("Perro no encontrado en la base de datos local. Buscando en la API...");

      console.log("ID del perro:", req.params.id);
      const response = await axios.get(`${process.env.API_URL}/${req.params.id}`);
      
      if (response.data.error) {
        // Si la API devuelve un error, enviar una respuesta con un error 404
        console.log(response.data.error);
        return res.status(404).json({ error: "Perro no encontrado en la API" });
      } else {
        // Si se encuentra el perro en la API, enviar la respuesta
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

//  Obtener todas las razas de perro de la API
const getSearch = async (req, res) => {
  try {
    console.log("Iniciando búsqueda de perros...");

    const misperros = await Dog.findAll();
    console.log("Perros encontrados en la base de datos:", misperros.length);

    // Parsear perros y obtener temperamentos
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


//temperamentos bd

// Ruta para obtener los temperamentos de un perro específico por su ID
const getTemperamentosBd = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recibido:", id); // Imprimir el ID recibido en la consola
    if (!id) {
      return res.status(400).json({ message: 'ID no proporcionado' });
    }
    const dog = await Dog.findByPk(id, { include: 'temperaments' }); // Corregir la opción include
    if (!dog) {
      return res.status(404).json({ message: 'Perro no encontrado' });
    }
    const temperaments = await dog.getTemperaments(); // Obtener los temperamentos asociados usando el método de asociación
    res.json(temperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



// Obtener temperamentos
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
      const temperamentosGuardados = Array.from(temperamentosfinal).slice(
        9,
        19
      );
      // Modifica el formato de los datos de los temperamentos para incluir una propiedad id
      const temperamentosConId = temperamentosGuardados.map((temperamento, index) => ({
        id: index + 1, // Genera un id único para cada temperamento
        name: temperamento,
      }));
      for (const temperamento of temperamentosConId) {
        await Temperament.create({
          name: temperamento.name,
        });
      }
      res.send(temperamentosConId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
};

// const getTemperamentos = async (req, res) => {
//   try {
//     let traertemperamentos = await Temperament.findAll();
//     traertemperamentos = JSON.stringify(traertemperamentos, null, 2);
//     traertemperamentos = JSON.parse(traertemperamentos);
//     if (traertemperamentos.length !== 0) {
//       res.send(traertemperamentos);
//     } else {
//       const response = await axios.get(process.env.API_URL);
//       let temperamentosfinal = new Set(); // Utiliza un Set para almacenar los temperamentos únicos
//       let temperamentos = response.data.map((el) => el.temperament);
//       let nuevostemperamentos = temperamentos
//         .map((el) => el && el.split(","))
//         .flat();
//       nuevostemperamentos.forEach((el) => {
//         temperamentosfinal.add(el); // Agrega el temperamento al Set
//       });
//       // Limita el número de temperamentos guardados
//       const temperamentosGuardados = Array.from(temperamentosfinal).slice(
//         9,
//         19
//       );
//       for (const temperamento of temperamentosGuardados) {
//         await Temperament.create({
//           name: temperamento,
//         });
//       }
//       res.send(temperamentosGuardados);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error interno del servidor");
//   }
// };

// Ruta para buscar perros en la base de datos
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
  getTemperamentosBd 
  
};
