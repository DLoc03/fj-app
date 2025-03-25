import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Job' },
    question: { type: String, required: true },
}, { timestamps: true })
const Question = mongoose.model('Question', QuestionSchema)
export default Question