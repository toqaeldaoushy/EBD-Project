import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ----------------------
// HELPER: Register User
// ----------------------
export const registerUser = async (fullName, email, password, phone) => {

  // Check if user exists
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already registered");
  }

  // Hash the password
  const hashed = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    fullName,
    email,
    password: hashed,
    phone,
    accountId: null
  });

  await user.save();

  return user;
};

// ----------------------
// HELPER: Login User
// ----------------------
export const loginUser = async (email, password) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};
