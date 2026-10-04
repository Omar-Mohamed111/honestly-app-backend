const AppError = require("../lib/error/error");
const logger = require("..//pkg/logger/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    statusCode: err.statusCode,
    stack: err.stack,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.error,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;