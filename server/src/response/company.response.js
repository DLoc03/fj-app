export const CompanyFound = ({ _id, name, description, recruiterId, dateOfEstablishment, address, status, jobList }) => ({
    id: _id,
    name,
    description,
    recruiter: recruiterId,
    dateOfEstablishment,
    address,
    status,
    jobList
});

export const Companies = ({ _id, name, description, recruiterId }) => ({
    id: _id,
    name,
    description,
    recruiter: recruiterId
})