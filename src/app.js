const cors = require("cors");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const connectDB = require("./config/db");

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

const authRouter = require("./features/auth/auth.route");
const messageRouter = require("./features/messages/message.route");
const userRouter = require("./features/users/users.route");
const errorHandler = require("./middleware/error.middleware");

app.use(
  cors({
    origin: "https://honestly-app-frontend.vercel.app",
    credentials: true,
  }),
);

app.use("/auth", authRouter);

app.use("/messages", messageRouter);

app.use("/users", userRouter);

app.use(errorHandler);

module.exports = app;
