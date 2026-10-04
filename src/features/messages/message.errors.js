const AppError = require("../../lib/error/error");

const messageErrors = {
  receiverNotFound: () => new AppError("Receiver Not Found", 404),

  messageToReplyNotFound: () => new AppError("Message To Reply Not Found", 404),
};

module.exports = messageErrors;
