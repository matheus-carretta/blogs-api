const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const errorHandler = (status, message) => {
  const newError = {
    status,
    message,
  };

  return newError;
};

const generateToken = (info) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ userId: info }, secret, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};

module.exports = {
  errorHandler,
  generateToken,
  verifyToken,
};
