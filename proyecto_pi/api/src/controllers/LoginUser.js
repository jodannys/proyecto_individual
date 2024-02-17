
const { getUserByEmail } = require("../handlers/getHandlers");
const bcrypt = require('bcrypt');
const { User } = require("../db");

// const loginUser = async ({ email, password }) => {
//   console.log("Email recibido:", email); // Para fines de depuración

//   try {
//     // Buscar un usuario con el correo electrónico proporcionado
//     const user = await getUserByEmail(email);

//     if (!user) {
//       // Si no se encuentra ningún usuario con el correo electrónico proporcionado
//       throw new Error("Correo electrónico no registrado");
//     }

//     // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       // Si la contraseña no coincide
//       throw new Error("Contraseña incorrecta");
//     }

//     // Si el correo y la contraseña son correctos, puedes devolver el usuario o cualquier otro dato necesario
//     return user;
//   } catch (error) {
//     // Manejar otros errores internos del servidor
//     console.error("Error al iniciar sesión:", error);
//     throw new Error("Error interno del servidor");
//   }
// };
const loginUser = async ({ email, password }) => {
  try {
    // Buscar un usuario con el correo electrónico proporcionado
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Si no se encuentra ningún usuario con el correo electrónico proporcionado
      throw new Error("Correo electrónico no registrado");
    }

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Si la contraseña no coincide
      throw new Error("Contraseña incorrecta");
    }

    // Si el correo y la contraseña son correctos, puedes devolver el usuario o cualquier otro dato necesario
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = loginUser;


