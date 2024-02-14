const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  const UserModel = sequelize.define(
    "User",
    {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Debe ser un email válido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*[a-zA-Z0-9]).+$/i,
        },
      },
    },
    {
      // Tiempo de creación de un usuario
      timestamps: false
    }
  );

  return UserModel; // Devolver el modelo de usuario
}

module.exports = User;
