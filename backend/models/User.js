import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    unique: true, 
    required: true  
  },

  password: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String, 
    unique: true, 
    required: true 
  },

  accountId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account",
    required: false
  },

  balance: {
    type: Number,
    required: true,
    default: 0.00 
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
