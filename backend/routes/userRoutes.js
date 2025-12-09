import express from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";
import { protect } from "../helpers/authHelpers.js";

const router = express.Router();

// Get logged in user profile
router.get("/me", protect, getProfile);

// Update name, email, phone
router.put("/update", protect, updateProfile);

// Change password
router.put("/change-password", protect, changePassword);

export default router; 

