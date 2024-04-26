import mongoose from "mongoose";
import { env } from "../utils/env";

export const connectToDB = async () => {
  try {
    await mongoose.connect(env.db_url);
  } catch (error: any) {
    console.log(error.message);
    return;
  }
};
