import { DateFormat } from "../utils/validation.js";

export const ApplicantResponse = {
    ApplicantCreate: ({ _id, email, name, phone, isDestroy, createdAt, updatedAt }) => ({
        id: _id,
        email,
        name,
        phone,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    })
}