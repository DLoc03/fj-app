import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String },
        phone: { type: String },
        role: { type: String, enum: ['admin', 'user'], default: 'user', required: true }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', UserSchema)