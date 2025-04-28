import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDestroy: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
TestSchema.index({ jobId: 1, isDestroy: 1 });
const Test = mongoose.model("Test", TestSchema);
export default Test;
