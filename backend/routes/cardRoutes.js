
const express = require("express");
const router = express.Router();
const Card = require("../models/Card")
const auth = require("../Middleware/auth");

//Creating a New Card
router.post("/create", auth, async (req, res) => {
  try {
    const { last4, brand } = req.body;

    const card = await Card.create({
      userId: req.user.id,
      last4,
      brand
    });

    res.json({ message: "Card created", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Lock Card
router.post("/:id/lock", auth, async (req, res) => {
    const card = await Card.findById(req.params.id);
    card.status = "locked";
    await card.save();
    res.json({message: "Card locked", card});
});

// Unlock card
router.post("/:id/unlock", auth, async (req, res) => {
  const card = await Card.findById(req.params.id);
  card.status = "active";
  await card.save();
  res.json({ message: "Card unlocked", card });
});

// Get all cards for logged-in user
router.get("/", auth, async (req, res) => {
  const cards = await Card.find({ userId: req.user.id });
  res.json(cards);
});

module.exports = router;


