import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const SALT = 10;

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return { errCode: 1, message: "Thông tin người dùng chưa được đăng ký" };

    const isMatchPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) return { errCode: 2, message: "Sai mật khẩu" };

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      errCode: 0,
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error(error);
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
  await User.findByIdAndUpdate(id, { refreshToken: null });
  return { errCode: 0, message: "Đăng xuất" };
};

const refreshAccessToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  if (!user) return { errCode: 1, message: "Invalid refresh token" };

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return { errCode: 2, message: "Token expired" };
  });

  const newAccessToken = generateToken(user);
  return {
    errCode: 0,
    accessToken: newAccessToken,
    refreshToken: refreshToken,
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
