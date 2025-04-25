import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
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

const Test = mongoose.model("Test", TestSchema);
export default Test;
