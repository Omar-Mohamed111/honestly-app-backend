const AppError = require("../../lib/error/error");

const otpErrors = {
  otpNotFound: () => new AppError("OTP Not Found", 404),

  otpExpired: () => new AppError("OTP Expired", 410),

  tooManyAttempts: () => new AppError("Too Many OTP Attempts", 429),

  invalidOTP: () => new AppError("Invalid OTP", 401),
};

module.exports = otpErrors;
