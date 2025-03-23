import { User } from "../model/user.js";
import { MasterResponse } from "../response/master.response.js";
import { UserResponse } from "../response/user.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
const getUserList = async () => {
    const list = await User.find().lean()
    const validUser = list.map((item) => UserResponse.UserLogin(item))
    return MasterResponse({ data: validUser })
}

const getUserById = async (id) => {
    const user = await User.findById(id).lean()
    if (!user) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: "User not found" })
    return MasterResponse({ data: UserResponse.UserInfo(user) })
}

const deleteUserById = async (id) => {
    const user = await User.findById(id)
    if (!user) return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: 'User not found'
    })
    await User.findByIdAndDelete(user._id).lean()
    return MasterResponse({
        message: "Deleted user successfully"
    })
}

const updateUserById = async (id, data) => {
    const user = await User.findById(id)
    if (!user) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST })
    const newData = await User.findByIdAndUpdate(id, data, { new: true })
    return MasterResponse({ message: "Update successful", data: UserResponse.UserLogin(newData) })
}

export const userService = {
    getUserList,
    getUserById,
    deleteUserById,
    updateUserById
}