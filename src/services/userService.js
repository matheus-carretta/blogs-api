const { User } = require('../database/models');
const { errorHandler, generateToken } = require('../utils');

const create = async (user) => {
  const { email } = user;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) throw errorHandler(409, 'User already registered');

  const createdUser = await User.create(user);

  const token = generateToken(createdUser.dataValues.id);

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

const destroy = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};
