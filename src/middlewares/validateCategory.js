const Joi = require('joi');
const { errorHandler } = require('../utils');

const CATEGORY = Joi.object({
  name: Joi.string().empty().required(),
});

const validateCategory = (req, _res, next) => {
  const { name } = req.body;

  const { error } = CATEGORY.validate({ name });

  if (error) throw errorHandler(400, error.details[0].message);

  next();
};

module.exports = validateCategory;
