export const UserResponse = {
    UserLogin: ({ _id, email, name, phone, role }) => ({
        id: _id,
        email,
        name,
        phone,
        role
    }),

    UserInfo: ({ email, name, phone }) => ({
        email,
        name,
        phone
    })
}