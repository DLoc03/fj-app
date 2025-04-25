import mongoose from "mongoose";
import { env } from "./env.config.js";

export const CONNECT_DB = async () => {
  await mongoose
    .connect(env.DB_URI)
    .then(() => console.log("Connected mongodb"))
    .catch((e) => console.error(e));
};
