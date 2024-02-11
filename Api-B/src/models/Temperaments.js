const { DataTypes } = require('sequelize');
// No necesitas importar sequelize aquí

module.exports = function(sequelize) {
  const Temperaments = sequelize.define("Temperaments", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  return Temperaments;
};