import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    color: {
      type: String,
      enum: ["gold", "silver"],
      default: null,
      required: true,
    },
    description: { type: String, default: null },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
PackageSchema.index({ price: 1, color: 1, isDestroy: 1 }, { unique: true });
const Package = mongoose.model("Package", PackageSchema);
export default Package;
