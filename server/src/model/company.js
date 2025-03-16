import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, required: true },
    dateOfEstablishment: { type: mongoose.Schema.Types.Date },
    address: { type: String, required: true },
    status: { type: String, enum: ['Đang xét duyệt', 'Đã xét duyệt'], default: 'Đang xét duyệt', required: true },
    jobList: { type: Array, default: [] }
},
    { timestamps: true }
)
const Company = mongoose.model('Company', CompanySchema)
export default Company