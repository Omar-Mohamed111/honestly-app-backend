const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./features/auth/auth.route");
const messageRouter = require("./features/messages/message.route");
const userRouter = require("./features/users/users.route");
const errorHandler = require("./middleware/error.middleware");
const AppError = require("./lib/error/error");

app.use("/auth", authRouter);

app.use("/messages", messageRouter);

app.use("/users", userRouter);

app.get("/test-error", (req, res, next) => {
  next(new AppError("This is a test error", 400));
});

app.use(errorHandler);

module.exports = app;
