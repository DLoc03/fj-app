import { authService } from '../service/auth.service.js'

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

export const authController = {
    registerUser,
    loginUser
}