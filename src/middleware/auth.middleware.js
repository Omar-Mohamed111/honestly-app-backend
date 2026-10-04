const jwt = require("jsonwebtoken");
const AppError = require("../lib/error/error");

const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = authenticate;
