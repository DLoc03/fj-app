import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    cv: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
ApplicantSchema.index({ email: 1, jobId: 1 }, { unique: true });
const Applicant = mongoose.model("Applicant", ApplicantSchema);
export default Applicant;
