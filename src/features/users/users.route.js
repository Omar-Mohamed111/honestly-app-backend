const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const validate = require("../../middleware/validation.middleware");
const usernameSchema = require("../../validation/username.validation");

router.get("/:username", validate(usernameSchema, "params"), userController.getUserByUsername);

module.exports = router;
