const { Dog, Temperament, User } = require("../db");
const loginUser = require("../controllers/LoginUser");
const bcrypt = require("bcrypt");


const postCreatedog = (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { name, altura, peso, años, temperamentsId } = req.body;

  // Validar datos antes de crear el perro
  if (!name || !altura || !peso || !años || !temperamentsId) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Crear un nuevo perro en la base de datos
  Dog.create({
      name,
      altura,
      peso,
      años,
      id: Date.parse(new Date()) // ¿Necesitas generar una ID única?
  })
  .then((dog) => {
      // Asignar temperamentos al perro
      dog.setTemperaments(temperamentsId);
      // Enviar respuesta con el perro creado
      res.status(200).json(dog);
  })
  .catch((error) => {
      // Manejar errores
      console.error('Error al crear un nuevo perro:', error);
      res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  });
}


// const postCreatedog = (req, res) => {
//   console.log("Datos recibidos en la solicitud:", req.body);

//   const { name, altura, peso, años, imagen, temperamentsId } = req.body;

//   if (!name || !altura || !peso || !años || !imagen) {
//     res.status(400).send('Faltan datos en el cuerpo de la solicitud');
//     return;
//   }
  
//   Dog.create({
//     name,
//     altura,
//     peso,
//     años,
//     imagen, 
//     id: Date.parse(new Date()),
//   })
//     .then((dog) => {
//       // Utilizamos una promesa encadenada para manejar la asociación con temperamentosId
//       return dog.setTemperaments(temperamentsId);
//     })
//     .then(() => {
//       res.status(200).send('Perro creado correctamente'); // Enviamos un mensaje de éxito
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send("Error interno del servidor");
//     });
// };


const postCreatetemperament = (req, res) => {
  const { temperamentonuevo } = req.body;

  if (!temperamentonuevo) {
    console.log('Error: Faltan datos en el cuerpo de la solicitud');
    res.status(400).send('Faltan datos en el cuerpo de la solicitud');
    return;
  }

  Temperament.create({
    name: temperamentonuevo,
    id: Date.parse(new Date()),
  })
    .then((temperament) => {
      res.status(200).send(temperament.dataValues);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      throw new Error("Se requiere un correo electrónico y una contraseña.");
    }

    const user = await loginUser({ email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  postCreatedog,
  postCreatetemperament,
  createUser,
  login,
};
