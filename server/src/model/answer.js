import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Applicant",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answer: { type: String, required: true },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;
