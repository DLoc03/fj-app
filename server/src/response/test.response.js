import { DateFormat } from "../utils/validation.js";

export const TestResponse = {
  Client: ({
    _id,
    jobId,
    title,
    description,
    isDestroy,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    jobId,
    title,
    description,
    isDestroy,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
