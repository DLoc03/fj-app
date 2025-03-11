import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const SALT = 10;

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { errCode: 1, message: "User not found" };

    const isMatchPassword = bcrypt.compare(password, user.password);
    if (!isMatchPassword) return { errCode: 2, message: "Incorrect password" };

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

const register = async (data) => {
  const { email, password, phone, name } = data;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return {
        errCode: 1,
        message: "Đã có thông tin người dùng",
      };
    }
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      phone: phone,
      name: name,
    });
    await newUser.save();
    return {
      errCode: 0,
      message: "Đăng ký thành công",
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: 2,
      message: "Đã có lỗi xảy ra",
    };
  }
};

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { refreshToken: null });
  if (!user) {
    return { errCode: 1, message: "User not found" };
  }
  return { errCode: 0, message: "Logged out successfully" };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    return {
      errCode: 1,
      message: "No refresh token provided",
    };
  }
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  if (!decoded || !decoded.id) {
    return { errCode: 2, message: "Invalid refresh token" };
  }

  const user = await User.findById({ _id: decoded.id });
  if (!user || user.refreshToken !== refreshToken) {
    return {
      errCode: 3,
      message: "Invalid refresh token",
    };
  }
  const newAccessToken = generateToken(user);
  return {
    errCode: 0,
    message: "Re-new access-token succeed",
    accessToken: newAccessToken,
  };
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
