import jwt from "jsonwebtoken";
import "dotenv/config";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.UNAUTHORIZED, message: "Unauthorized! Token is required." }));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.UNAUTHORIZED, message: "Invalid or expired token!" }));
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
};

export const authorizeAdmin = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(401).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.UNAUTHORIZED, message: "Unauthorized" }));
  }
  next();
};

export const isOwnerId = (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.role !== "admin") {
    return res.status(401).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.UNAUTHORIZED, message: "Unauthorized" }));
  }
  next();
};
