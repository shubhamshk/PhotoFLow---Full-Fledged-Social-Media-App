import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loop.routes.js";
import storyRouter from "./routes/story.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://photoflow-front.onrender.com", // frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("🚀 Backend is running on Render");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/loop", loopRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  connectDb();
  console.log(`🚀 Server started on port ${port}`);
});
