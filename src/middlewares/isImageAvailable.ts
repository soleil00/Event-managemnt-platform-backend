import { NextFunction, Response } from "express";

export const isImageAvailable = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    !req.file
      ? res.status(400).json({
          message: " Image is missing ",
        })
      : next();
  } catch (error: any) {
    console.error("Error fetching event by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
