import mongoose from "mongoose";

const RecruitmentSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobVacancy: { type: String, required: true },
    quantity: { type: mongoose.Schema.Types.Number, required: true, default: 1 },
    jobDescription: { type: String },
    listApplicant: { type: Array, default: [] },
    salary: { type: String, default: '0' }
})
const Recruitment = mongoose.model('Recruitment', RecruitmentSchema)
export default Recruitment