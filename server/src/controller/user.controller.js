import { userService } from "../service/user.service.js"

const getUsers = async (req, res) => {
    try {
        const list = await userService.getUserList()
        return res.status(200).json({ list })
    } catch (error) {
        return res.status(500).json({ message: "Error server" })
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
        return res.status(500).json({ message: "Error server" })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUserById(req.params.id);
        if (result.errCode != 1)
            return res.status(200).json(result);
        return res.status(404).json({ result })
    } catch (error) {
        return res.status(500).json({ message: "Error server" })
    }
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const result = await userService.updateUserById(id, data);
        if (result.errCode === 1) {
            return res.status(404).json({ message: result.message });
        } else if (result.errCode === 2) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error updating user by ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const userController = {
    getUsers,
    getUserById,
    deleteUserById,
    updateUserById
}