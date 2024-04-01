const { Dog } = require("../db");
const { generateDatabaseId } = require("../../utils/GeneradorId");
const createDog = async (req, res) => {
  try {
    const { imagenURL, name, altura, peso, años_vida, temperaments } = req.body;

    if (!name || !altura || !peso || !años_vida) {
      return res.status(400).json({ error: "Faltan campos obligatorios o son nulos" });
    }

    // Generar un ID único para el perro
    const id = generateDatabaseId();

    // Crear el nuevo perro
    const newDog = await Dog.create({
      id,
      imagenURL,
      name,
      altura,
      peso,
      años_vida,
    });

    // Asociar los temperamentos existentes al nuevo perro
    await newDog.addTemperaments(temperaments);

    res.status(200).json({ message: "Perro creado correctamente", dog: newDog });
  } catch (error) {
    console.error("Error al crear un nuevo perro:", error);
    res.status(500).json({
      error: "Ocurrió un error al procesar la solicitud",
      originalError: error.message,
    });
  }
};

module.exports = {
  createDog,
};


