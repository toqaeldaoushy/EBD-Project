import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  last4: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    default: "Visa"
  },

  status: {
    type: String,
    default: "active"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Card = mongoose.model("Card", CardSchema);
export default Card;
