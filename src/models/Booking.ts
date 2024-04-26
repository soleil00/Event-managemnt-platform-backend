import mongoose from "mongoose";
import { IBooking } from "../utils/types";

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    numTickets: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
