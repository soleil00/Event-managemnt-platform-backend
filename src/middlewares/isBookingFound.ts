import { NextFunction, Request, Response } from "express";
import Booking from "../models/Booking";

export const isBookingFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const ticket = await Booking.findById(id)
      .populate("user")
      .populate("event");

    if (!ticket) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    next();
  } catch (error: any) {
    console.error("Error fetching event by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
