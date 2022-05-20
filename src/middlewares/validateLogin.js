const Joi = require('joi');
const { errorHandler } = require('../utils');

const LOGIN = Joi.object({
  email: Joi.required(),
  password: Joi.required,
});

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = LOGIN.validate({ email, password });

  if (error) {
    const newError = errorHandler(400, 'Some required fields are missing');
    next(newError);
  }

  next();
};

module.exports = {
  validateLogin,
};
