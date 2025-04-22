import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
    action: { type: String, required: true },
    entity: { type: String },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: false },
    requestData: { type: Object, required: true },
    responseStatus: { type: Number, required: false },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model('AuditLog', AuditSchema);
export default AuditLog;
