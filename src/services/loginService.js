const { User } = require('../database/models/index');
const { errorHandler, generateToken } = require('../utils');

const login = async (email, password) => {
  const userExists = await User.findOne({ where: { email, password } });

  if (!userExists) {
    throw errorHandler(400, 'Invalid fields');
  }
  const token = generateToken(email);

  return token;
};

module.exports = {
  login,
};
