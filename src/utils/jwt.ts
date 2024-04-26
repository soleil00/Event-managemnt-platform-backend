import { sign, verify } from "jsonwebtoken";
import { IUser } from "./types";
import { env } from "./env";
import User from "../models/User";

export const generateUserToken = async (user: IUser): Promise<string> => {
  try {
    const token = sign({ userId: user._id }, env.jwt_secret, {
      expiresIn: "72h",
    });
    return token;
  } catch (error: any) {
    console.error("Error generating user token:", error.message);
    throw new Error("Failed to generate user token");
  }
};

export const verifyUserToken = async (token: string): Promise<IUser | null> => {
  try {
    const decoded = verify(token, env.jwt_secret) as { userId: string };

    const user = await User.findById(decoded.userId);
    return user;
  } catch (error: any) {
    console.error(
      "Error decoding or retrieving user from token:",
      error.message
    );
    throw new Error(error.message);
  }
};
