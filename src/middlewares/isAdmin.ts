import { NextFunction, Request, Response } from "express";
import { IUser } from "../utils/types";

export const isAdmin = async (
  req: Request & { currentUser: IUser },
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.currentUser.isAdmin) {
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
