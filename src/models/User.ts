import { Schema, model } from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
