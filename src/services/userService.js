const { User } = require('../database/models');
const { errorHandler, generateToken } = require('../utils');

const create = async (user) => {
  const { displayName, email, image } = user;

  const userExists = await User.findOne({ where: { email } });

  console.log(user)
  if (userExists) throw errorHandler(409, 'User already registered');
  console.log('oi')

  await User.create(user);

  const token = generateToken({ displayName, email, image });

  return token;
};

module.exports = {
  create,
};
