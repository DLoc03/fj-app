import { DateFormat } from "../utils/validation.js";

export const JobResponse = {
    Jobs: ({ _id, companyId, jobName, quantity, isDestroy, jobDescription, salary, createdAt, updatedAt }) => ({
        id: _id,
        companyId,
        jobName,
        quantity,
        jobDescription,
        salary,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    })

}