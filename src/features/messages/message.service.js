const messageRepository = require("./message.repository");
const userRepository = require("./../users/users.repository");
const messageErrors = require("./message.errors");
const cacheProvider = require("../../lib/cache/init");

const createMessage = async (data, sender) => {
  const receiver = await userRepository.findUserById(data.receiver);
  if (!receiver) {
    throw messageErrors.receiverNotFound();
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
      throw messageErrors.messageToReplyNotFound();
    }
  }

  const message = await messageRepository.createMessage(messageData);
  await cacheProvider.del(`messages:${data.receiver}`);
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
