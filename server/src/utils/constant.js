import 'dotenv/config'

export const WHITE_LIST = [
    process.env.CLIENT_URI,
    /**Add more domain if you wanna more domain can access your server */
]

export const SALT = 10