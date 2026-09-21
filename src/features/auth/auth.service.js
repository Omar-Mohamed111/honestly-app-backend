const userRepository = require("../users/users.repository");
const bcrypt = require("bcrypt");
const otpService = require("../otp/otp.service");
const jwt = require("jsonwebtoken");

// ******************
// Register
// ******************

const createUser = async (data) => {
  const isEmailExist = await userRepository.findUserByEmail(data.email);
  if (isEmailExist) {
    const error = new Error("Email Already Exist");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const user = await userRepository.createUser(data);

  await otpService.createOTP(user._id, "emailVerification", user.email);
  return user;
};

const verifyOTP = async (email, otp) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  await otpService.verifyOTP(user._id, otp, "emailVerification");

  // // make verify = true
  await userRepository.verifyUser(user._id);

  return true;
};

// ******************
// Login
// ******************

const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.isVerified) {
    const error = new Error("Email Not Verified");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Invalid Email or Password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

// ******************
// Foreget And Rest Password
// ******************

const forgotPassword = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  await otpService.createOTP(user._id, "passwordReset", user.email);

  return true;
};

const resetPassword = async (email, otp, newPassword) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  await otpService.verifyOTP(user._id, otp, "passwordReset");
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepository.updatePassword(user._id, hashedPassword);

  return true;
};

module.exports = {
  createUser,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
};
