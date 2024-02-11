const Razas = require("../models/Razas");
const Temperaments = require("../models/Temperaments");
const createDogs = async (req, res) => {
  const {
    Nombre,
    Altura,
    Peso,
    Años_de_vida,
    Temperamentos: temperamentosData,
  } = req.body;

  try {
    const nuevaRaza = await Razas.create({
      Nombre,
      Altura,
      Peso,
      Años_de_vida,
    });
    if (temperamentosData && temperamentosData.length > 0) {
      const temperamentos = await Promise.all(
        temperamentosData.map(async (nombreTemperamento) => {
          let temperamento = await Temperaments.findOne({
            where: { Nombre: nombreTemperamento },
          });
          if (!temperamento) {
            temperamento = await Temperaments.create({
              Nombre: nombreTemperamento,
            });
          }
          return temperamento;
        })
      );
      await nuevaRaza.addTemperamentos(temperamentos);
    } else {
      throw new Error(
        "Se debe proporcionar al menos un temperamento para crear una nueva raza de perro"
      );
    }
    res.status(201).json(nuevaRaza);
  } catch (error) {
    console.error("Error al crear la raza de perro:", error.message);
    res.status(500).json({ message: "Error al crear la raza de perro" });
  }
};

module.exports = createDogs;
