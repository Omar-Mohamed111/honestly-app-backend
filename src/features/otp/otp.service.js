const otpRepository = require("./otp.repository");
const { sendEmail } = require("../../lib/email/mail.service");
const crypto = require("crypto");
const otpTemplate = require("./otp.template");
const otpErrors = require("./otp.errors");

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
    throw otpErrors.otpNotFound();
  }

  if (Date.now() > storedOTP.expiresAt.getTime()) {
    throw otpErrors.otpExpired();
  }

  if (storedOTP.attempts >= 5) {
    throw otpErrors.tooManyAttempts();
  }

  if (otp !== storedOTP.otp) {
    const updatedOTP = await otpRepository.incrementAttempts(userId, purpose);

    if (updatedOTP.attempts >= 5) {
      throw otpErrors.tooManyAttempts();
    }

    throw otpErrors.invalidOTP();
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
