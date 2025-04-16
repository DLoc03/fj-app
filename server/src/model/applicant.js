import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    cv: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
  },
  { timestamps: true }
);
const Applicant = mongoose.model("Applicant", ApplicantSchema);
export default Applicant;
