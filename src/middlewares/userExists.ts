import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.body;
  try {
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(409).json({
        status: 409,
        message: "User with this email address already exists",
      });
    }

    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(409).json({
        status: 409,
        message: "User with this username already exists",
      });
    }

    next();
  } catch (error: any) {
    console.error("Error :", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
