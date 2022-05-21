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

module.exports = {
  create,
};
