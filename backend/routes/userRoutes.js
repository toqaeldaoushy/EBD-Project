import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  getRecipients
} from "../controllers/userController.js";

import { protect } from "../helpers/authHelpers.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// ✅ THIS ROUTE

router.get("/recipients", protect, getRecipients);

export default router;




