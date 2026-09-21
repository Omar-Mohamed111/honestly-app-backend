const OTP = require("./otp.model");

const createOTP = async (data) => {
  return await OTP.create(data);
};

const findOTP = async (userId, purpose) => {
  return await OTP.findOne({
    user: userId,
    purpose,
  });
};

const deleteOTP = async (userId, purpose) => {
  return await OTP.findOneAndDelete({
    user: userId,
    purpose,
  });
};

const incrementAttempts = async (userId, purpose) => {
  return await OTP.findOneAndUpdate(
    {
      user: userId,
      purpose,
    },
    {
      $inc: { attempts: 1 },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  findOTP,
  createOTP,
  deleteOTP,
  incrementAttempts,
};
