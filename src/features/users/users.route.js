const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const validate = require("../../middleware/validation.middleware");
const usernameSchema = require("./validation/username.validation");
const withCache = require("../../lib/cache/withCache");
const User = require("./users.model");
const { uploadSingleFile, uploadArrayFile } = require("../../lib/media/multer");
const {fileValidation} = require("../../lib/media/file.validationType");

router.get(
  "/get-all-users",
  (req, res, next) => {
    console.log("✅ Get All Users Route Reached");
    next();
  },
  withCache(),
  async (req, res, next) => {
    const users = await User.find();
    res.json(users);
  },
);

router.get(
  "/:username",
  validate(usernameSchema, "params"),
  userController.getUserByUsername,
);

router.post("/upload-profile-pic", uploadSingleFile("pp"), (req, res, next) => {
  console.log(req.file);
  res.json("ok");
});

router.post(
  "/upload-cv",
  uploadSingleFile("cv",["application/pdf", "application/msword"]),
  fileValidation(["application/pdf", "application/msword"]),
  (req, res, next) => {
    console.log(req.file);
    res.json("ok");
  },
);

router.post(
  "/upload-cover-images",
  uploadArrayFile("cover-images", 3),
  (req, res, next) => {
    res.json("ok");
  },
);

module.exports = router;
