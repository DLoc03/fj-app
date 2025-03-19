const UserLogin = ({ _id, email, name, phone, role }) => ({
    id: _id,
    email,
    name,
    phone,
    role
})

const UserInfo = ({ email, name, phone }) => ({
    email,
    name,
    phone
})

export const UserResponse = {
    UserLogin,
    UserInfo
}