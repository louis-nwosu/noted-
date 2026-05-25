import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { authRoutes, notesRoutes, mediaRoutes, shareRoutes } from "./routes";
import { getStats } from "./controllers/notes.controller";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/share", shareRoutes);

app.get("/api/stats", getStats);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    data: { status: "ok", timestamp: new Date().toISOString() },
  });
});

async function start() {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`NoteTake API running on http://localhost:${PORT}`);
  });
}

start();
