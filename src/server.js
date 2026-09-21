require("dotenv").config();

const app = require("./app");
const PORT = 3000;

const connectDB = require("./config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed ❌");
    console.error(error.message);
  }
};

startServer();