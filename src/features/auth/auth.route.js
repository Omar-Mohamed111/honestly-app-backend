const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const validate = require("../../middleware/validation.middleware");
const registerSchema = require("../../validation/register.validation");
const loginSchema = require("../../validation/login.validation");
const verifyOTPSchema = require("../../validation/verify-otp.validation");
const forgotPasswordSchema = require("../../validation/forgot-password.validation");
const resetPasswordSchema = require("../../validation/reset-password.validation");

router.post("/register", validate(registerSchema), authController.createUser);

router.post("/verify-otp", validate(verifyOTPSchema), authController.verifyOTP);

router.post("/login", validate(loginSchema), authController.login);

router.post("/forgot-password",validate(forgotPasswordSchema), authController.forgotPassword);

router.post("/reset-password", validate(resetPasswordSchema),authController.resetPassword);

router.post("/logout", authController.logout);

module.exports = router;
