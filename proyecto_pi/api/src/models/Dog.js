const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    años: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey:true,
    },
  });
};
