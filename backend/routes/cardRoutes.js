import express from "express";
import Card from "../models/Card.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE CARD
router.post("/create", protect, async (req, res) => {
  try {
    const { last4, brand } = req.body;

    const card = await Card.create({
      userId: req.user._id,
      last4,
      brand
    });

    res.json({ message: "Card created", card });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOCK CARD
router.post("/:id/lock", protect, async (req, res) => {
  const card = await Card.findById(req.params.id);
  card.status = "locked";
  await card.save();
  res.json({ message: "Card locked", card });
});

// UNLOCK CARD
router.post("/:id/unlock", protect, async (req, res) => {
  const card = await Card.findById(req.params.id);
  card.status = "active";
  await card.save();
  res.json({ message: "Card unlocked", card });
});

// GET USER CARDS
router.get("/", protect, async (req, res) => {
  const cards = await Card.find({ userId: req.user._id });
  res.json(cards);
});

export default router;
