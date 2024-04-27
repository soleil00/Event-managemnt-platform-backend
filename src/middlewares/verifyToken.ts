import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../utils/jwt";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = await verifyUserToken(token);
    if (decoded !== null) {
      console.log(decoded);
      return res.status(200).json({
        status: 200,
        message: "Login successful check",
        token,
        user: decoded,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid token or user not found" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
