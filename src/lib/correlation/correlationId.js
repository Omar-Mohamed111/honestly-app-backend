const crypto = require("crypto");

const correlationId = (req, res, next) => {
  const id = crypto.randomUUID();
  req.correlationId = id;
  res.setHeader("X-correlation-Id", id);

  next();
};

module.exports = correlationId;
