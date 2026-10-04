const messageRepository = require("./message.repository");
const userRepository = require("./../users/users.repository");
const messageErrors = require("./message.errors");
const { getCache, setCache, deleteCache } = require("../../pkg/cache/cache");

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
  await deleteCache(`messages:${data.receiver}`);

  return message;
};

// ************************************

const getMessages = async (userId) => {
  const cacheKey = `messages:${userId}`;

  const cachedMessages = await getCache(cacheKey);
  if (cachedMessages) {
    console.log("CACHE HIT ✅");

    return cachedMessages;
  }

  const messages = await messageRepository.findMessagesByReceiver(userId);

  await setCache(cacheKey, messages, 60);
  console.log("CACHE MISS ✅");

  return messages;
};

module.exports = {
  createMessage,
  getMessages,
};
