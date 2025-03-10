import { authService } from '../service/auth.service.js'
import { userService } from '../service/user.service.js'
import 'dotenv/config'
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
        const result = await authService.login(email, password)
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            errCode: 0,
            message: "Login successful",
            accessToken: result.accessToken,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                phone: result.user.phone,
                role: result.user.role
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const response = await authService.refreshAccessToken(refreshToken);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        const response = await authService.logout(req.user.id);
        console.log(req.user.id);
        if (response.errCode === 0) return res.status(200).json(response)
        return res.status(403).json(response);
    } catch (error) {
        console.log(error);

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