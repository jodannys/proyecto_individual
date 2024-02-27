const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temperament = sequelize.define('temperament', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false 
  });

  return Temperament;
};
