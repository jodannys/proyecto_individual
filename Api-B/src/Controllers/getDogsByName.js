const { Op } = require("sequelize");
const { Razas } = require("../models/Razas");

const getDogsByName= async (req, res) => {
    const nombre = req.query.name;
    try {
        const razasDB = await Razas.findAll({
            where: {
                Nombre: {
                    [Op.iLike]: `%${nombre}%`
                }
            }
        });

        if (razasDB.length === 0 && razasAPI.length === 0) {
            res.status(404).json({ message: "No se encontraron razas con ese nombre" });
            return;
        }
        const razas = [...razasDB, ...razasAPI];
        res.json(razas);
    } catch (error) {
        console.error("Error al buscar razas por nombre:", error);
        res.status(500).json({ message: "Error al buscar razas por nombre" });
    }
};
module.exports = getDogsByName;
