//para Crear un Perro:
const Dog = require("../models/Dog");

const createDog = async (req, res) => {
  try {
    const { name, altura, peso, años, temperamentsId } = req.body.perroNuevo;
    const dog = await Dog.create({
      name,
      altura,
      peso,
      años,
    });
    await dog.setTemperaments(temperamentsId);
    res.status(200).send(dog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creando perro");
  }
};

module.exports = createDog;
