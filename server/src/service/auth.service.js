import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { SALT } from "../utils/constant.js";
import { UserResponse } from "../response/user.response.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "User not found",
    });

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword)
    return MasterResponse({
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Incorrect password",
    });

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return MasterResponse({
    data: { accessToken, refreshToken, user: UserResponse.UserLogin(user) },
  });
};

const register = async (data) => {
  const { email, password, phone, name } = data;
  const existedUser = await User.findOne({ email }).lean();
  if (existedUser) {
    return MasterResponse({
      status: STATUS.FAILED,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "User is already",
    });
  }
  const hashedPassword = bcrypt.hashSync(password, SALT);
  const newUser = new User({
    email: email,
    password: hashedPassword,
    phone: phone,
    name: name,
  });
  await newUser.save();
  return MasterResponse({ message: "Register successfully" });
};

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { refreshToken: null }).lean();
  if (!user) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: 1,
      message: "User not found",
    });
  }
  return MasterResponse({ message: "Logged out successfully" });
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "No refresh token provided",
    });
  }
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  if (!decoded || !decoded.id) {
    return MasterResponse({
      status: STATUS.FAILED,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Invalid refresh token",
    });
  }

  const user = await User.findById({ _id: decoded.id }).lean();
  if (!user || user.refreshToken !== refreshToken) {
    return MasterResponse({
      status: STATUS.FAILED,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Incorrect refresh token",
    });
  }
  const newAccessToken = generateToken(user);
  return MasterResponse({ data: newAccessToken });
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const authService = {
  register,
  login,
  logout,
  refreshAccessToken,
};
