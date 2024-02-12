// const Dog = require("../models/Dog")
// // Obtener Razas de Perro:
// const getDogsByTemperament = async (req, res) => {
//   const { temperament } = req.params;
//   try {
//     const razasConTemperamento = await Dog.findAll({
//       where: {
//         temperament: temperament,
//       },
//     });
//     if (razasConTemperamento.length === 0) {
//       return res.status(404).json({
//         message: `No se encontraron razas con el temperamento "${temperament}"`,
//       });
//     }
//     res.json(razasConTemperamento);
//   } catch (error) {
//     console.error("Error al obtener las razas por temperamento:", error);
//     if (error.name === "SequelizeDatabaseError") {
//       return res.status(500).json({
//         message:
//           "Error en la base de datos al obtener las razas por temperamento",
//       });
//     } else if (error.name === "SequelizeConnectionError") {
//       return res.status(500).json({
//         message:
//           "Error de conexión a la base de datos al obtener las razas por temperamento",
//       });
//     } else {
//       return res.status(500).json({
//         message: "Error al obtener las razas por temperamento:",
//         error,
//       });
//     }
//   }
// };

// module.exports = getDogsByTemperament;

const Temperament = require("../models/Temperament");

// Obtener Razas de Perro por Temperamento
const getDogsByTemperament = async (req, res) => {
  const { temperament } = req.params;
  try {
    // Buscar el temperamento por su nombre
    const temperamento = await Temperament.findOne({
      where: { name: temperament },
    });

    if (!temperamento) {
      return res.status(404).json({
        message: `No se encontraron razas con el temperamento "${temperament}"`,
      });
    }

    // Obtener las razas de perro asociadas con este temperamento
    const razasConTemperamento = await temperamento.getDogs();

    if (razasConTemperamento.length === 0) {
      return res.status(404).json({
        message: `No se encontraron razas con el temperamento "${temperament}"`,
      });
    }

    res.json(razasConTemperamento);
  } catch (error) {
    console.error("Error al obtener las razas por temperamento:", error);
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({
        message:
          "Error en la base de datos al obtener las razas por temperamento",
      });
    } else if (error.name === "SequelizeConnectionError") {
      return res.status(500).json({
        message:
          "Error de conexión a la base de datos al obtener las razas por temperamento",
      });
    } else {
      return res.status(500).json({
        message: "Error al obtener las razas por temperamento:",
        error,
      });
    }
  }
};

module.exports = getDogsByTemperament;
