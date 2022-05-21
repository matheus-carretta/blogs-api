const Joi = require('joi');
const { errorHandler } = require('../utils');

const LOGIN = Joi.object({
  email: Joi.string().empty().required(),
  password: Joi.string().empty().required(),
});

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = LOGIN.validate({ email, password });
  
  if (error) {
    throw errorHandler(400, 'Some required fields are missing');
  }

  next();
};

module.exports = {
  validateLogin,
};
