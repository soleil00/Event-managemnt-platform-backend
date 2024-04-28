import { Document, Types } from "mongoose";
import Event from "../models/Event";

export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  image: string;
  description: string;
  numTickets: number;
  term?: string;
  isPaid: boolean;
  category: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: "ACTIVE" | "CANCELED" | "ENDED";
  type: string;
}

export interface IBooking extends Document {
  user: Types.ObjectId;
  event: Types.ObjectId;
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

export enum EventStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  ENDED = "ENDED",
}

export interface IUserData {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
