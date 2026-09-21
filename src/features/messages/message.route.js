const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/auth.middleware");
const messagesController = require("./message.controller");
const validate = require("../../middleware/validation.middleware");
const createMessageSchema = require("../../validation/create-message.validation");

router.post("/",  authenticate,validate(createMessageSchema), messagesController.createMessage);

router.get("/", authenticate, messagesController.getMessages);

module.exports = router;
