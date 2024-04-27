import { Request, Response } from "express";
import Booking from "../models/Booking";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate("user").populate("event");
    const count = await Booking.countDocuments();

    count > 0
      ? res.status(200).json({
          message: "Booking found",
          count,
          bookings: bookings,
        })
      : res.status(404).json({
          status: 404,
          message: "No bookings found",
        });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
