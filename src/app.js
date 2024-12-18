const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRouter = require("./routes/user.router");
const subscriptionRouter = require("./routes/subscription.router");
const videoRouter = require("./routes/video.router");
const likeRouter = require("./routes/like.router");
const commentRouter = require("./routes/comment.router");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribe", subscriptionRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/video", likeRouter);
app.use("/api/v1/video", commentRouter);

module.exports = { app };
