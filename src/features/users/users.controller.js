const userService = require("./users.service");

const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserByUsername,
};
