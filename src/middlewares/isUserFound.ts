import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const isUserFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    next();
  } catch (error: any) {
    console.error("Error fetching user by ID:", error.message);
    throw new Error("Failed to fetch user by ID");
    res.status(500).json({ error: error.message });
  }
};
