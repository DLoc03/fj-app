import mongoose from "mongoose";
import "dotenv/config";
export const CONNNECT_DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};
