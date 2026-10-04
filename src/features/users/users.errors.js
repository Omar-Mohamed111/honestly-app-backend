const AppError = require("../../lib/error/error");

const userErrors = {
  userNotFound: () => new AppError("User not found", 404),
};

module.exports = userErrors;
