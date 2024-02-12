const Dog = require("../models/Dog");

const searchDogsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const razas = await Dog.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });
    res.json(razas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error buscando razas de perro por nombre");
  }
};

module.exports = searchDogsByName;
