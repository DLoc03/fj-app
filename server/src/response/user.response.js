import { DateFormat } from "../utils/validation.js";

export const UserResponse = {
  UserLogin: ({
    _id,
    email,
    name,
    phone,
    avatar,
    isDestroy,
    role,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    email,
    name,
    phone,
    avatar,
    role,
    isDestroy,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),

  UserInfo: ({
    _id,
    email,
    name,
    phone,
    avatar,
    role,
    isDestroy,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    email,
    name,
    phone,
    isDestroy,
    role,
    avatar,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
