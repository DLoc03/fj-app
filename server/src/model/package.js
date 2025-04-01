import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, default: null },
    isDestroy: { type: Boolean, default: false }
}, { timestamps: true })
const Package = mongoose.model('Package', PackageSchema)
export default Package