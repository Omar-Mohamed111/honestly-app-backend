const User = require("./users.model");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  return await User.create(data);
};

const verifyUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isVerified: true });
};

const findUserById = async (userId) => {
  return await User.findById(userId);
};

const updatePassword = async (userId, hashedPassword) => {
  return await User.findByIdAndUpdate(userId, { password: hashedPassword });
};

const getUserByUsername = async (username) => {
  return await User.findOne({username});
};

module.exports = {
  findUserByEmail,
  createUser,
  verifyUser,
  findUserById,
  updatePassword,
  getUserByUsername,
};
