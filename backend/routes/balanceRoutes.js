import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET wallet balance
router.get("/balance", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("balance");
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET recent transactions (last 5)
router.get("/recent-transactions", protect, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id })
            .sort({ date: -1 })
            .limit(5);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;

