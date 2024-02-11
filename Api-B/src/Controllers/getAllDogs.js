const Razas = require("../models/Razas");

const getAllDogs = async (req, res) => {
  try {
    const razas = await Razas.findAll();
    res.json(razas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las razas de perros" });
  }
};
 module.exports = getAllDogs;