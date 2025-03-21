export const JobResponse = {
    Jobs: ({ _id, companyId, jobName, quantity, jobDescription, salary }) => ({
        id: _id,
        companyId,
        jobName,
        quantity,
        jobDescription,
        salary
    })

}