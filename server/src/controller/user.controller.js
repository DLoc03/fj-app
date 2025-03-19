import { MasterResponse } from "../response/master.response.js"
import { userService } from "../service/user.service.js"
import { ERROR_CODE, STATUS } from "../utils/enum.js"

const getUsers = async (req, res) => {
    try {
        const list = await userService.getUserList()
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}

const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUserById(req.params.id);
        if (result.errCode != 1)
            return res.status(200).json(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(200).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.BAD_REQUEST, message: "No update data provided" }));
    }
    try {
        const result = await userService.updateUserById(id, data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}

export const userController = {
    getUsers,
    getUserById,
    deleteUserById,
    updateUserById
}