import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user', required: true },
    refreshToken: { type: String, default: null },
    avatar: { type: String, default: null },
    isDestroy: { type: Boolean, default: false }
}, { timestamps: true })
const User = mongoose.model('User', UserSchema)
export default User