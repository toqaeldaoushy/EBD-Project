import express from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../helpers/authHelpers.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    await registerUser(fullName, email, password, phone);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
