import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
dotenv.config(); // Load .env variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ FAKE USER (OFFLINE MODE)
const fakeUser = {
  _id: "123456789",
  fullName: "Sara Samer",
  email: "sara@gmail.com",
  phone: "01000000000",
  password: "123456"
};

// ✅ FAKE LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === fakeUser.email && password === fakeUser.password) {
    return res.json({
      token: "FAKE_TOKEN_123",
      user: fakeUser
    });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

// ✅ FAKE GET PROFILE
app.get("/api/users/me", (req, res) => {
  res.json(fakeUser);
});

// TRANSFER ROUTES
app.use("/api/transfer", transferRoutes);

// CONNECT TO MONGODB & START SERVER
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

  if (fullName) fakeUser.fullName = fullName;
  if (email) fakeUser.email = email;
  if (phone) fakeUser.phone = phone;

  res.json({
    message: "Profile updated successfully",
    user: fakeUser
  });
});

// ✅ FAKE CHANGE PASSWORD
app.put("/api/users/change-password", (req, res) => {
  res.json({ message: "Password changed successfully" });
});

// ✅ SERVER STARTS 100% GUARANTEED
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Offline server running at http://localhost:${PORT}`);
});
