const Joi = require('joi');
const { errorHandler } = require('../utils');

const UPDATE = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
});

const validateUpdatePost = (req, _res, next) => {
  const { title, content } = req.body;

  const { error } = UPDATE.validate({ title, content });

  if (error) throw errorHandler(400, 'Some required fields are missing');

  next();
};

module.exports = validateUpdatePost;
