const errorHandler = (status, message) => {
  const newError = {
    status,
    message,
  };

  return newError;
};

module.exports = {
  errorHandler,
};
