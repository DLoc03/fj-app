import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const SALT = 10

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return {
                errCode: 1,
                message: "No user existed",
            }
        } else {
            const isMatchPassword = bcrypt.compareSync(password, user.password)
            if (!isMatchPassword) {
                return {
                    errCode: 2,
                    message: "Password is incorrect",
                }
            } else {
                return {
                    errCode: 0,
                    message: "Login successful",
                    accessToken: generateToken(user),
                    refreshToken: generateRefreshToken(user)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}


const register = async (data) => {
    const { email, password, phone, name } = data;
    try {
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return {
                errCode: 1,
                message: "User already exists"
            };
        }
        const hashedPassword = bcrypt.hashSync(password, SALT);
        const newUser = new User({
            email: email,
            password: hashedPassword,
            phone: phone,
            name: name
        });
        await newUser.save();
        return {
            errCode: 0,
            message: "User register was successful"
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: 2,
            message: "An error occurred"
        };
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )
}
export const authService = {
    register,
    login
}