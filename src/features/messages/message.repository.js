const Message = require("./message.model");

const findMessageById = async (messageId) => {
  return await Message.findById(messageId);
};

const createMessage = async (data) => {
  return await Message.create(data);
};

const findMessagesByReceiver = async (userId) => {
  return await Message.find({
    receiver: userId,
  });
};

const findMessageByIdAndReceiver = async (messageId, receiverId) => {
  return await Message.findOne({
    _id: messageId,
    receiver: receiverId,
  });
};

module.exports = {
  findMessageById,
  createMessage,
  findMessagesByReceiver,
  findMessageByIdAndReceiver,
};
