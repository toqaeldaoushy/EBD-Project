import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

  phone: { 
    type: String, 
    unique: true, 
    required: true 
  },

  accountId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account",
    required: false   // You may assign it later after account creation
  },

  balance: {
    type: Number,
    required: true,
    default: 0.00 
  },
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;


