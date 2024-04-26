import { Document, Types } from "mongoose";
import Event from "../models/Event";

export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  image: string;
  description: string;
  numTickets: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: "ACTIVE" | "CANCELED" | "ENDED";
  type: Types.ObjectId;
}

export interface IBooking extends Document {
  user: string;
  event: Types.ObjectId | Event;
  numTickets: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bookings: Types.ObjectId[];
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EventTypeEN {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  ENDED = "ENDED",
}
