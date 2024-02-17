const { User } = require("../db");
 const bcrypt =require("bcrypt");
const createUser = async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
   
      return res.status(400).json({ error: "Usuario ya registrado" });
    }

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos con la contraseña encriptada
    const newUser = await User.create({
      id,
      name,
      email,
      password: hashedPassword, // Almacenar la contraseña encriptada
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(400).json({ error: error.message });
  }
};


module.exports = createUser;
