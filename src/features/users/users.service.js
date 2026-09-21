const userReository = require("./users.repository");

const getUserByUsername = async (username) => {
  const user = await userReository.getUserByUsername(username);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

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
