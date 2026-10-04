const userErrors = require("./users.errors");
const userReository = require("./users.repository");

const getUserByUsername = async (username) => {
  const user = await userReository.getUserByUsername(username);
  if (!user) throw userErrors.userNotFound();

  return {
    id: user._id,
    username: user.username,
    name: user.name,
    picture: user.picture,
  };
};

module.exports = {
  getUserByUsername,
};
