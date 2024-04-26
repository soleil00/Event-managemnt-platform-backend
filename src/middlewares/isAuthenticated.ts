import { NextFunction, Request, Response } from "express";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(403).json({
        message: "No token provided",
      });
    }
  } catch (error) {}
};
