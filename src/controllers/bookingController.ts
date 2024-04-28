import { Request, Response } from "express";
import Booking from "../models/Booking";
import { IUser } from "../utils/types";
import Event from "../models/Event";
import User from "../models/User";

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

export const cancelBooking = async (req: any, res: Response) => {
  const currentUser: IUser = req.currentUser;
  const { id } = req.params;
  try {
    const ticket = await Booking.findById(id)
      .populate("event")
      .populate("user");

    if (ticket) {
      if (String(ticket.user._id) === String(currentUser._id)) {
        await User.findByIdAndUpdate(currentUser._id, {
          $pull: { bookings: id },
        });

        const nn = await Event.findByIdAndUpdate(
          { _id: ticket?.event._id },
          { $inc: { numTickets: ticket?.numTickets } },
          { new: true }
        );

        await Booking.findByIdAndDelete(id);

        return res.status(200).json({
          status: 200,
          message: "Booking cancelled successfully",
        });
      } else {
        return res.status(401).json({
          status: 401,
          user: ticket.user,
          currentUser,
          soleil: ticket.user._id === currentUser._id,
          message: "You are not authorized to cancel this booking",
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
