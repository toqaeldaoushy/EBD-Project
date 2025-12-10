// Cashly Backend – Main Server Setup

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import historyRoutes from "./routes/HistoryRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";


dotenv.config(); // Load .env variables

const app = express();

// -------------------------------
// MIDDLEWARE
// -------------------------------
app.use(cors());
app.use(express.json());

// -------------------------------
// TEST ROUTE
// -------------------------------
app.get("/", (req, res) => {
  res.send("Cashly API is running");
});

// -------------------------------
// ROUTES
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/card", cardRoutes);

// -------------------------------
// CONNECT TO MONGO + START SERVER
// -------------------------------
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

main();
