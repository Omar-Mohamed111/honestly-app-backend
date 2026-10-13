const { fileTypeFromBuffer } = require("file-type");
const fs = require("node:fs");
const AppError = require("../../pkg/utils/error/AppError");

// Middleware to validate file type by magic number (file signatures)
const fileValidation = (allowedTypes = ["image/png", "image/jpeg"]) => {
  return async (req, res, next) => {
    try {
      // get the file path
      const filePath = req.file.path;
      // read the file and return buffer
      const buffer = fs.readFileSync(filePath);
      // get the file type
      const type = await fileTypeFromBuffer(buffer);
      // validate
      if (!type || !allowedTypes.includes(type.mime))
        return next(new AppError("Invalid file type", 400));

      return next();
    } catch (error) {
        fs.unlinkSync(filePath)
      return next(new Error("Internal server error"));
    }
  };
};

module.exports = { fileValidation };
