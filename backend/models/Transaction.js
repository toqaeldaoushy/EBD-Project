import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },

  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },

  amount: { 
    type: Number, 
    required: true,
    min: 1.0
  },
  
  type: { 
    type: String, 
    enum: ["send", "receive"], 
    required: true 
  },

  description: { 
    type: String, 
    default: "" 
  },
  
  date: { 
    type: Date, 
    default: Date.now 
  },
}, { 
  timestamps: true
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;