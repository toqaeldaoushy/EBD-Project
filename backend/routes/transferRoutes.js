import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Import your new middleware
import { transferMoney } from "../helpers/transferHelpers.js"; // Import the atomic logic helper

const router = express.Router();


router.post("/send", protect, async (req, res) => {
  const senderId = req.user._id; 
  const { receiverPhone, amount, description } = req.body;

  try {
    if (!receiverPhone || !amount) {
      return res.status(400).json({ message: "Please provide receiver phone and transfer amount." });
    }
    
    const transferAmount = Number(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
        return res.status(400).json({ message: "Invalid transfer amount." });
    }

    // Execute the Transfer Logic
    const result = await transferMoney(senderId, receiverPhone, transferAmount, description);

    // Handle Result
    if (result.success) {
      res.status(200).json({ 
          message: result.message,
          amount: transferAmount,
          toPhone: receiverPhone
      });
    } else {
      res.status(400).json({ message: result.message });
    }

  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).json({ message: "Server error during transfer process......" });
  }
});

export default router;