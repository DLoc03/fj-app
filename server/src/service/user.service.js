import { User } from "../model/user.js";

const getUserList = async () => {
    return {
        errCode: 0,
        message: 'Succeed',
        result: {
            list: await User.find().select('-password')
        }
    }
}

const getUserById = async (id) => {
    const user = await User.findById(id).select('-password')
    if (!user) {
        return {
            errCode: 1,
            message: "User wasn't existed"
        }
    } else {
        return {
            errCode: 0,
            message: "Found user success",
            user: user
        }
    }
}

const deleteUserById = async (id) => {
    const user = await User.findById(id)
    if (!user) {
        return {
            errCode: 1,
            message: 'User not found'
        }
    }
    await User.findByIdAndDelete(user._id)
    return {
        errCode: 0,
        message: "Delete user succeed"
    }
}

const updateUserById = async (id, data) => {
    const user = await User.findById(id);
    if (!user) {
        return {
            errCode: 1,
            message: 'User not found'
        };
    }

    if (!data || Object.keys(data).length === 0) {
        return {
            errCode: 2,
            message: 'No update data provided'
        };
    }

    Object.assign(user, data);
    await user.save();

    return {
        errCode: 0,
        message: "Update successful",
        newInfo: user
    };
}

export const userService = {
    getUserList,
    getUserById,
    deleteUserById,
    updateUserById
}