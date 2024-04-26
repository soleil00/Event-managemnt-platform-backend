import { NextFunction, Request, Response } from "express";
import Event from "../models/Event";

export const isEventFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    next();
  } catch (error: any) {
    console.error("Error fetching event by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
