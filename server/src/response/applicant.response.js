export const ApplicantResponse = {
    ApplicantCreate: ({ _id, email, name, phone }) => ({
        id: _id,
        email,
        name,
        phone
    })
}