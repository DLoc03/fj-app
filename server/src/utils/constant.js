import "dotenv/config";

export const WHITE_LIST = [
  `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  /**Add more domain if you wanna more domain can access your server */
  `http://${process.env.ADMIN_HOST}:${process.env.ADMIN_PORT}`,
];

export const SALT = 10;
