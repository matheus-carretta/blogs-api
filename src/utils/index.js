const jwt = require('jsonwebtoken');
require('dotenv').config();

const errorHandler = (status, message) => {
  const newError = {
    status,
    message,
  };

  return newError;
};

const generateToken = (info) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: info }, secret, jwtConfig);

  return token;
};

module.exports = {
  errorHandler,
  generateToken,
};
