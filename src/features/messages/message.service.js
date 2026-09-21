const messageRepository = require("./message.repository");
const userRepository = require("./../users/users.repository");

const createMessage = async (data, sender) => {
  const receiver = await userRepository.findUserById(data.receiver);
  if (!receiver) {
    const error = new Error("Receiver Not Found");
    error.statusCode = 404;
    throw error;
  }

  const messageData = {
    sender,
    receiver: data.receiver,
    content: data.content,
    isAnonymous: data.isAnonymous,
    replyTo: data.replyTo,
  };

  if (data.replyTo) {
    const repliedMessage = await messageRepository.findMessageByIdAndReceiver(
      data.replyTo,
      sender,
    );

    if (!repliedMessage) {
      const error = new Error("Message To Reply Not Found");
      error.statusCode = 404;
      throw error;
    }
  }

  const message = await messageRepository.createMessage(messageData);
  return message;
};

// ************************************

const getMessages = async (userId) => {
  const messages = await messageRepository.findMessagesByReceiver(userId);

  return messages;
};

module.exports = {
  createMessage,
  getMessages,
};
