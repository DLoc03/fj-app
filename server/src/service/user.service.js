import { User } from "../model/user.js";

const getUserList = async () => {
    try {
        return {
            errCode: 0,
            message: 'Succeed',
            result: {
                list: await User.find()
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

export const userService = {
    getUserList
}