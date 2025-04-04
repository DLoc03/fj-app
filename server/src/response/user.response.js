import { DateFormat } from "../utils/validation.js";

export const UserResponse = {
    UserLogin: ({ _id, email, name, phone, isDestroy, role, createdAt, updatedAt }) => ({
        id: _id,
        email,
        name,
        phone,
        role,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    }),

    UserInfo: ({ _id, email, name, phone, isDestroy, createdAt, updatedAt }) => ({
        id: _id,
        email,
        name,
        phone,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    })
}