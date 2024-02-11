const fetch = require('node-fetch'); 
const Temperaments  = require("../models/Temperaments"); 
require('dotenv').config(); // Carga las variables de entorno de un archivo .env

const getTemperaments = async (req, res) => {
    try {
        console.log("Ejecutando getTemperaments...");

        const temperamentosAPI = await fetchTemperamentosFromAPI(); // Obtiene los temperamentos de la API

        await Temperaments.bulkCreate(temperamentosAPI); // Almacena los temperamentos en la base de datos

        res.json(temperamentosAPI); // Responde con los temperamentos obtenidos
    } catch (error) {
        console.error("Error al obtener los temperamentos:", error.message);
        res.status(500).json({ message: "Error al obtener los temperamentos" });
    }
};

async function fetchTemperamentosFromAPI() {
    try {
        console.log("Obteniendo temperamentos desde la API...");

        const apiKey = process.env.API_KEY; // Obtiene la clave de la API desde las variables de entorno
        const url = process.env.API_URL; // Obtiene la URL de la API desde las variables de entorno
        const response = await fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        }); // Realiza la solicitud HTTP a la API
        const data = await response.json(); // Convierte la respuesta en formato JSON
        return data; // Devuelve los temperamentos obtenidos
    } catch (error) {
        console.error("Error al obtener los temperamentos desde la API:", error.message);
        throw new Error("Error al obtener los temperamentos desde la API");
    }
}

module.exports = getTemperaments; // Exporta la función getTemperaments
