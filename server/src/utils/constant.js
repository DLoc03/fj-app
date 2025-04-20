import "dotenv/config";

export const WHITE_LIST = [
  process.env.CLIENT_URI,
  /**Add more domain if you wanna more domain can access your server */
  process.env.ADMIN_URI,
  process.env.MOBILE_URI,
];

export const SALT = 10;
