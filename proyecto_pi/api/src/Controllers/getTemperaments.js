const Temperament = require("../models/Temperament");
//para Obtener los Temperamentos:
const getTemperaments = async (req, res) => {
  try {
    const traertemperamentos = await Temperament.findAll();
    if (traertemperamentos.length !== 0) {
      res.send(traertemperamentos);
    } else {
      // Código para obtener los temperamentos de la API y almacenarlos en la base de datos
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obteniendo temperamentos");
  }
};

module.exports = getTemperaments;
