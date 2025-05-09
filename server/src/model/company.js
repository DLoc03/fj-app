import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dateOfEstablishment: { type: mongoose.Schema.Types.Date },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Authenticated"],
      default: "Pending",
      required: true,
    },
    avatar: { type: String, default: null },
    isDestroy: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", CompanySchema);
export default Company;
