import { authService } from "../service/auth.service.js";
import { userService } from "../service/user.service.js";
import { MasterResponse } from "../response/master.response.js";
import redis from "../config/redis.config.js";
import "dotenv/config";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
const registerUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    const result = await authService.register({ email, password, name, phone });
    await redis.del("/api/v1/user/:{}");
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({
          status: STATUS.FAILED,
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await authService.login(email, password);
    if (response.status === STATUS.DONE && response.result.data) {
      res.cookie("refreshToken", response.result.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      const { refreshToken, ...responseData } = response.result.data;
      return res.status(200).json(MasterResponse({ data: responseData }));
    }
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({
          status: STATUS.FAILED,
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const result = await authService.refreshAccessToken(refreshToken);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({
          status: STATUS.FAILED,
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
  }
};

export const logout = async (req, res) => {
  try {
    const response = await authService.logout(req.user.id);
    if (response.result.errCode === ERROR_CODE.DONE) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      return res.status(200).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({
          status: STATUS.FAILED,
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
  }
};

export const getMe = async (req, res) => {
  try {
    const response = await userService.getUserById(req.user.id);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({
          status: STATUS.FAILED,
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
  }
};

export const authController = {
  registerUser,
  loginUser,
  logout,
  refreshAccessToken,
  getMe,
};
