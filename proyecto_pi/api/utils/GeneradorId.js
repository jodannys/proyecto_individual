
const generateDatabaseId = () => {
    // Obtener la fecha actual en milisegundos
    const timestamp = new Date().getTime();
    // Generar un número aleatorio entre 0 y 9999
    const random = Math.floor(Math.random() * 10000);
    // Concatenar la marca de tiempo y el número aleatorio para formar el ID
    const databaseId = `${timestamp}${random}`;
    return databaseId;
  };
  
  module.exports = { generateDatabaseId };
  