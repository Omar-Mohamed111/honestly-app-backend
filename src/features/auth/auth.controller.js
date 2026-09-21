const authService = require("./auth.service");

// ******************
// Register
// ******************
const createUser = async (req, res, next) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyOTP(email, otp);
    res.json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ******************
// Login
// ******************

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "You are logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ******************
// Logout
// ******************

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
// ******************
// Foreget And Rest Password
// ******************

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);

    res.status(200).json({
      message: "Password reset OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await authService.resetPassword(email, otp, newPassword);

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
