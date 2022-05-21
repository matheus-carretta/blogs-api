const Joi = require('joi');
const { errorHandler } = require('../utils');

const USER = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (req, _res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = USER.validate({ displayName, email, password });

  if (error) throw errorHandler(400, error.details[0].message);

  next();
};

module.exports = validateUser;