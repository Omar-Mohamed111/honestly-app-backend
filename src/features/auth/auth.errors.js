const AppError = require("../../lib/error/error");

const authErrors = {
  emailAlreadyExists: () => new AppError("Email Already Exist", 409),

  userNotFound: () => new AppError("User Not Found", 404),

  emailNotVerified: () => new AppError("Email Not Verified", 403),

  invalidCredentials: () => new AppError("Invalid Email or Password", 401),
};

module.exports = authErrors;
