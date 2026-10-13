const AppError = require("../pkg/utils/error/AppError");
const logger = require("../pkg/logger/logger");
const correlationId = require("../lib/correlation/correlationId");

const errorHandler = (err, req, res, _next) => {
  // ===================================================
  logger.error(err.message, {
    statusCode: err.statusCode,
    stack: err.stack,
    correlationId: req.correlationId,
  });

  // ====================================================
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.error,
    });
  }

  // ====================================================
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
