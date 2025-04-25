import mongoose from "mongoose";
import "dotenv/config";
async function CONNECT_DB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.error("Mongodb conect failed", error);
    process.exit(1);
  }
}
export { CONNECT_DB };
