const multer = require("multer");
const crypto = require("node:crypto");
const AppError = require("../../pkg/utils/error/AppError");

const multerUpload = (allowedTypes = ["image/png", "image/jpeg"]) => {
  return multer({
    fileFilter: function (req, file, cb) {
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new AppError("invalid file format", 400), false);
      }
      cb(null, true);
    },
    storage: multer.diskStorage({
      destination: "uploads",

      filename: function (req, file, cb) {
        console.log(file);

        cb(null, `${crypto.randomUUID()} + ${file.originalname}`);
      },
    }),
  });
};

const uploadSingleFile = (
  fieldName,
  allowedTypes = ["image/png", "image/jpeg"],
) => {
  return multerUpload(allowedTypes).single(fieldName);
};

const uploadArrayFile = (fieldName, maxCount) => {
  return multerUpload().array(fieldName, maxCount);
};

const uploadFieldFile = (fields) => {
  return multerUpload().fields(fields);
};

module.exports = {
  uploadSingleFile,
  uploadArrayFile,
  uploadFieldFile,
};
