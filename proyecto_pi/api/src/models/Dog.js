const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    imagenURL: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    peso: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    años_vida: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true
  });

  return Dog;
};
