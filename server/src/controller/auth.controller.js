import { authService } from '../service/auth.service.js'
import { userService } from '../service/user.service.js'

const registerUser = async (req, res, next) => {
    const { email, password, name, phone } = req.body
    try {
        const newUser = await authService.register({ email, password, name, phone })
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const loggedUser = await authService.login(email, password)
        res.status(200).json({ loggedUser })
    } catch (error) {
        console.log(error);
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const response = await authService.refreshAccessToken(refreshToken);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        const response = await authService.logout(req.user.id);
        if (response.errCode === 0) return res.status(200).json(response)
        return res.status(403).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const response = await userService.getUserById(req.user.id);
        if (response.errCode === 1) {
            return res.status(404).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const authController = {
    registerUser,
    loginUser,
    logout,
    refreshAccessToken,
    getMe
}