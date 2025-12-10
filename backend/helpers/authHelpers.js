import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    accountId: null,
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

// ----------------------
// MIDDLEWARE: Protect routes (requires JWT)
// ----------------------
export const protect = async (req, res, next) => {
  let token;

  // Expect header: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided" });
  }

  try {
    // Decode token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user (without password) to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // move to controller (getProfile, updateProfile, etc.)
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
