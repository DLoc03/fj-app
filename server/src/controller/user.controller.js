import redis from "../config/redis.config.js";
import { MasterResponse } from "../response/master.response.js";
import { userService } from "../service/user.service.js";
import { ERROR_CODE, STATUS, STATUS_CODE } from "../utils/enum.js";

const getUsers = async (req, res) => {
  try {
    const isDestroy = req.query.isDestroy
      ? req.query.isDestroy === "true"
      : null;
    const list = await userService.getUserList(isDestroy);
    return res.status(STATUS_CODE.OK).json(list);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const deleteUserById = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.params.id);
    await redis.del("/api/v1/user/:{}");
    return res.status(STATUS_CODE.OK).json(result);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const updateUserById = async (req, res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(STATUS_CODE.OK).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "No update data provided",
      })
    );
  }
  try {
    const result = await userService.updateUserById(req.user.id, data);
    await redis.del("/api/v1/user/:{}");
    return res.status(STATUS_CODE.OK).json(result);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const uploadAvatarById = async (req, res) => {
  try {
    const response = await userService.updateUserById(req.user.id, {
      avatar: req.file.path,
    });
    await redis.del("/api/v1/user/:{}");
    return res.status(STATUS_CODE.OK).json(response);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const deleteAvatarById = async (req, res) => {
  try {
    const response = await userService.updateUserById(req.user.id, {
      avatar: null,
    });
    await redis.del("/api/v1/user/:{}");
    return res.status(STATUS_CODE.OK).json(response);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

export const userController = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  uploadAvatarById,
  deleteAvatarById,
};
