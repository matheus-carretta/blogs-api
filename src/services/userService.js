const { User } = require('../database/models');
const { errorHandler, generateToken } = require('../utils');

const create = async (user) => {
  const { displayName, email, image } = user;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) throw errorHandler(409, 'User already registered');

  await User.create(user);

  const token = generateToken({ displayName, email, image });

  return token;
};

module.exports = {
  create,
};
