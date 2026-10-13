const mongoose = require("mongoose");
const env = require("../config/env");

const connectDB = async () => {
  await mongoose.connect(env.db.url);

  console.log("MongoDB Connected Successfully ✅");
};

module.exports = connectDB;
