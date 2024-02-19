const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imagen: {
      type: DataTypes.TEXT, // Cambiado a TEXT para almacenar la URL de la imagen
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
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
  }, {
    timestamps: false // Corregido: timestamps debe estar dentro del segundo parámetro del define()
  });

  return Dog;
};
