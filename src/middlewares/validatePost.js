const Joi = require('joi');
const { errorHandler } = require('../utils');

const POST = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validatePost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = POST.validate({ title, content, categoryIds });

  if (error) throw errorHandler(400, 'Some required fields are missing');

  next();
};

module.exports = validatePost;