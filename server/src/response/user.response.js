import { DateFormat } from "../utils/validation.js";

export const UserResponse = {
  UserLogin: ({
    _id,
    email,
    name,
    phone,
    avatar,
    isDestroy,
    isPaid,
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
    isPaid,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),

  UserInfo: ({
    _id,
    email,
    name,
    phone,
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
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
