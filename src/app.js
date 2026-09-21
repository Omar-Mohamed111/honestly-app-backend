const cors = require("cors");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./features/auth/auth.route");
const messageRouter = require("./features/messages/message.route");
const userRouter = require("./features/users/users.route");
const errorHandler = require("./middleware/error.middleware");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRouter);

app.use("/messages", messageRouter);

app.use("/users", userRouter);

app.use(errorHandler);

module.exports = app;
