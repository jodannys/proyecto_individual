const Razas = require("../models/Razas");
const Temperaments = require("../models/Temperaments");

const getDogById= async (req, res) => {
  const idRaza = req.params.idRaza;
  try {
    const raza = await Razas.findByPk(idRaza, { include: Temperaments });
    if (!raza) {
      return res.status(404).json({ message: "Raza no encontrada" });
    }
    res.json(raza);
  } catch (error) {
    console.error("Error al obtener la raza:", error);
    res.status(500).json({ message: "Error al obtener la raza" });
  }
};

module.exports = getDogById;
