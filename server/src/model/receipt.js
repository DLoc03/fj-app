import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Package",
    },
    amount: { type: Number, required: true },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Receipt = mongoose.model("Receipt", ReceiptSchema);
export default Receipt;
