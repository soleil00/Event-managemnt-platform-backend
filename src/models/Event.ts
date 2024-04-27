import mongoose from "mongoose";
import { IEvent } from "../utils/types";

const eventSchema = new mongoose.Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numTickets: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    term: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELED", "ENDED"],
      default: "ACTIVE",
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
