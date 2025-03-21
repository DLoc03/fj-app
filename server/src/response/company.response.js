export const CompanyResponse = {
    CompanyFound: ({ _id, name, description, recruiterId, dateOfEstablishment, address, status, jobList }) => ({
        id: _id,
        name,
        description,
        recruiterId,
        dateOfEstablishment,
        address,
        status,
    }),

    Companies: ({ _id, name, description, recruiterId }) => ({
        id: _id,
        name,
        description,
        recruiterId
    })
}