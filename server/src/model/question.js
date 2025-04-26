import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Test",
    },
    question: { type: String, required: true },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
QuestionSchema.index({ testId: 1 });
const Question = mongoose.model("Question", QuestionSchema);
export default Question;
