import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import chatRoutes from "./src/routes/chatRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cookieParser());

// --- Naya Simple CORS jo sabko allow karega ---
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Nexus AI Server is live" });
});

app.use("/chat", chatRoutes);
app.use("/image", imageRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
