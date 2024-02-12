const Dog = require("../models/Dog");
// Obtener Detalles de un Perro por ID:
const getDogById = async (req, res) => {
  try {
    const detallesdog = await Dog.findByPk(req.params.id);
    if (!detallesdog) {
      return res.status(404).send("Perro no encontrado");
    }
    const temperaments = await detallesdog.getTemperaments();
    const perrito = detallesdog.toJSON();
    perrito.temperament = temperaments.map((t) => t.name).join(", ");
    res.send(perrito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obteniendo detalles del perro");
  }
};

module.exports = getDogById;

