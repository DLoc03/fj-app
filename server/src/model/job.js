import mongoose from "mongoose";

const RecruitmentSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobName: { type: String, required: true, default: 'No name' },
    quantity: { type: mongoose.Schema.Types.Number, required: true, default: 1 },
    jobDescription: { type: String, default: 'No description' },
    salary: { type: String, default: '0' }
})
const Job = mongoose.model('job', RecruitmentSchema)
export default Job