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
AnswerSchema.index({ applicantId: 1, questionId: 1, isDestroy: 1 });
const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;
