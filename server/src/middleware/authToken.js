import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Token is required." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token!" });
    }
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token payload!" });
    }
    req.user = { id: decoded.id };
    next();
  });
};

export const authorizeAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorize" });
    }
    next();
  };
};

export const isOwnerId = (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.role != "admin")
    return res.status(403).json({ message: "Unauthorize" });
  next();
};
