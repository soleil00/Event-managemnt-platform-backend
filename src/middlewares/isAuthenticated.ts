import { NextFunction, Response } from "express";
import { verifyUserToken } from "../utils/jwt";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "Soleil says token is missing 👎" });
  }
  try {
    console.log("from tokn ---> ", token);
    const user = await verifyUserToken(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid token or user not found" });
    }
    req.currentUser = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
