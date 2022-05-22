const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw errorHandler(401, 'Token not found');

  try {
    jwt.verify(token, secret);
    req.token = token;
  } catch (err) {
    console.log(err);
    throw errorHandler(401, 'Expired or invalid token');
  }

  next();
};

module.exports = validateToken;