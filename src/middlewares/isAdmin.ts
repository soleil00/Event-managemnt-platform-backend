import { NextFunction, Request, Response } from "express";
import { IUser } from "../utils/types";

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  try {
    if (currentUser.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "You are not authorized to perform this action buddy ��",
      });
    }
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
