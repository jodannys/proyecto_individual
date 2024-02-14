const { User } = require("../db");

const createUser = async (id, name, email, password) => {
  try {
    const newUser = await User.create({
      id,
      name,
      email,
      password,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = createUser;
