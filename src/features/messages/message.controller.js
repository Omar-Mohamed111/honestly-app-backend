const messageService = require("./message.service");

const createMessage = async (req, res, next) => {
  try {
    const sender = req.user.userId;
    const message = await messageService.createMessage(req.body, sender);

    res.status(201).json({
      message: "you message created successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
 try {
   const userId = req.user.userId;
  const messages = await messageService.getMessages(userId);

  res.status(200).json({
    data: messages,
  });
 } catch (error) {
  next(error)
 }
};

module.exports = {
  createMessage,
  getMessages,
};
