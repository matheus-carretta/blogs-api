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

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!user) throw errorHandler(404, 'User does not exist');

  return user.dataValues;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: email });

  return user;
};

module.exports = {
  create,
  getAll,
  getById,
  getByEmail,
};
