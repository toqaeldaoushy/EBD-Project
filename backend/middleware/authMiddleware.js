import jwt from "jsonwebtoken";
import User from "../models/User.js"; 

// checks for a valid JWT and protects routes
const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the Authorization header (CashlyToken <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("CashlyToken")
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];
      
      const secret = process.env.JWT_SECRET;
      
      // Verify token
      const decoded = jwt.verify(token, secret);
      
      // Find the user and attach it to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };