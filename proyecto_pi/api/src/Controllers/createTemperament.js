//createTemperament

const Temperament = require("../models/Temperament");

const createTemperament = async (req, res) => {
  try {
    const temperament = await Temperament.create({
      name: req.body.temperamentonuevo,
    });
    res.send(temperament);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando temperamento");
  }
};

module.exports = createTemperament;
