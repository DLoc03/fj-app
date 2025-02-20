import { userService } from "../service/user.service.js"

const getUsers = async (req, res, next) => {
    try {
        const list = await userService.getUserList()
        return res.status(200).json({ list })
    } catch (error) {
        console.error(error);
    }
}



export const userController = {
    getUsers
}