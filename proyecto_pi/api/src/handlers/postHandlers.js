const { Dog, Temperament } = require("../db");
const { generateDatabaseId } = require('../../utils/GeneradorId');

// funcion para crear el perro


// const postCreatedog = async (req, res) => {
//   try {
//     const { imagenURL, name, altura, peso, años_vida, temperaments } = req.body;

//     if (!name || !altura || !peso || !años_vida) {
//       return res
//         .status(400)
//         .json({ error: "Faltan campos obligatorios o son nulos" });
//     }
//     const newDog = await Dog.create({
//       imagenURL,
//       name,
//       altura,
//       peso,
//       años_vida,
//     });

//     if (temperaments && temperaments.length > 0) {
//       const temperamentsToAdd = [];
//       for (const temperamentName of temperaments) {
//         // Buscar el temperamento
//         const [temperament, created] = await Temperament.findOrCreate({
//           where: { name: temperamentName },
//         });
//         // Agrego el temperamento
//         temperamentsToAdd.push(temperament.name); // Aquí se añade solo el nombre
//       }
//       // Asocio todos los temperamentos
//       await newDog.addTemperaments(temperamentsToAdd);
//     }

//     res
//       .status(201)
//       .json({ message: "Perro creado correctamente", dog: newDog });
//   } catch (error) {
//     console.error("Error al crear un nuevo perro:", error);
//     res.status(500).json({
//       error: "Ocurrió un error al procesar la solicitud",
//       originalError: error.message,
//     });
//   }
// };

const postCreatedog = async (req, res) => {
  try {
    const { imagenURL, name, altura, peso, años_vida, temperaments } = req.body;

    if (!name || !altura || !peso || !años_vida) {
      return res
        .status(400)
        .json({ error: "Faltan campos obligatorios o son nulos" });
    }
    
    // Generar un ID único para el perro
    const id = generateDatabaseId();

    const newDog = await Dog.create({
      id,
      imagenURL,
      name,
      altura,
      peso,
      años_vida,
    });

    if (temperaments && temperaments.length > 0) {
      const temperamentsToAdd = [];
      for (const temperamentName of temperaments) {
        // Buscar el temperamento
        const [temperament, created] = await Temperament.findOrCreate({
          where: { name: temperamentName },
        });
        // Agrego el temperamento
        temperamentsToAdd.push(temperament.name); // Aquí se añade solo el nombre
      }
      // Asocio todos los temperamentos
      await newDog.addTemperaments(temperamentsToAdd);
    }

    res
      .status(201)
      .json({ message: "Perro creado correctamente", dog: newDog });
  } catch (error) {
    console.error("Error al crear un nuevo perro:", error);
    res.status(500).json({
      error: "Ocurrió un error al procesar la solicitud",
      originalError: error.message,
    });
  }
};
// funcion para crear los temperamentos
const postCreatetemperament = (req, res) => {
  const { temperamentonuevo } = req.body;

  if (!temperamentonuevo) {
    console.log("Error: Faltan datos en el cuerpo de la solicitud");
    res.status(400).send("Faltan datos en el cuerpo de la solicitud");
    return;
  }

  Temperament.create({
    name: temperamentonuevo,
    id: Date.parse(new Date()),
  })
    .then((temperament) => {
      res.status(200).send(temperament.dataValues);
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
