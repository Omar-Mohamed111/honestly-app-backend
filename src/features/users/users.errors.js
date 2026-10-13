const AppError = require("../../pkg/utils/error/AppError");

const userErrors = {
  userNotFound: () => new AppError("User not found", 404),
};

module.exports = userErrors;
