const userService = require('../services/userService');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = {
    displayName,
    email,
    password,
    image,
  };

  const token = await userService.create(newUser);

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  return res.status(200).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};
