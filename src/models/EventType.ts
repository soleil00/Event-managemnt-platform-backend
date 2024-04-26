import mongoose from "mongoose";

const eventTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventType = mongoose.model("EventType", eventTypeSchema);

export default EventType;
