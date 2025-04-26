import { DateFormat } from "../utils/validation.js";

export const ApplicantResponse = {
  Create: ({
    _id,
    jobId,
    email,
    name,
    phone,
    isDestroy,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    jobId,
    email,
    name,
    phone,
    isDestroy,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
