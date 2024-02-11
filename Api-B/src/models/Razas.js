const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  const Razas = sequelize.define("Razas", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Altura: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Peso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Años_de_vida: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  });

  return Razas;
};