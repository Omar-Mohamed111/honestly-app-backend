const otpRepository = require("./otp.repository");
const { sendEmail } = require("./mail.service");
const crypto = require("crypto");
const otpTemplate = require("./otp.tamplate");

// // generateOTP
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// // generateExpiration
const generateExpiration = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

//  // createOTP  AND send otp to email
const createOTP = async (userId, purpose, email) => {
  const otp = generateOTP();
  const expiresAt = generateExpiration();
  const html = otpTemplate(otp);

  const newOTP = await otpRepository.createOTP({
    user: userId,
    otp,
    purpose,
    expiresAt,
  });

  await sendEmail(
    email, // to
    "Honestly App - Email Verification", // subject
    html, // html
  );

  return newOTP;
};

// // verifyOTP
const verifyOTP = async (userId, otp, purpose) => {
  const storedOTP = await otpRepository.findOTP(userId, purpose);

  if (!storedOTP) {
    const error = new Error("OTP Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (Date.now() > storedOTP.expiresAt.getTime()) {
    const error = new Error("OTP Expired");
    error.statusCode = 410;
    throw error;
  }

  if (storedOTP.attempts >= 5) {
    const error = new Error("Too Many OTP Attempts");
    error.statusCode = 429;
    throw error;
  }

  if (otp !== storedOTP.otp) {
    const updatedOTP = await otpRepository.incrementAttempts(userId, purpose);

    if (updatedOTP.attempts >= 5) {
      const error = new Error("Too Many OTP Attempts");
      error.statusCode = 429;
      throw error;
    }

    const error = new Error("Invalid OTP");
    error.statusCode = 401;
    throw error;
  }

  await otpRepository.deleteOTP(userId, purpose);

  return true;
};
module.exports = {
  generateOTP,
  generateExpiration,
  createOTP,
  verifyOTP,
};
