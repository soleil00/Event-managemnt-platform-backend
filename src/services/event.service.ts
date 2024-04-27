import { Request } from "express";
import { EventStatus, IEvent, IUser } from "../utils/types";
import Event from "../models/Event";
import Booking from "../models/Booking";
import cloudinary from "../utils/cloudinary";

export const findAllEvents = async (): Promise<IEvent[]> => {
  try {
    const events = await Event.find();
    return events;
  } catch (error: any) {
    console.error("Error fetching events:", error.message);
    throw new Error(error.message);
  }
};

export const registerEvent = async (req: any): Promise<IEvent> => {
  const tickets = parseInt(req.body.numTickets, 10);
  const price = parseFloat(req.body.price);

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newEvent = await Event.create({
      ...req.body,
      price: price,
      numTickets: tickets,
      image: result.secure_url,
    });
    return newEvent;
  } catch (error: any) {
    console.error("Error creating event:", error.message);
    throw new Error(error.message);
  }
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error: any) {
    console.error("Error fetching event by ID:", error.message);
    throw new Error(error.message);
  }
};

export const deleteEventById = async (id: string): Promise<boolean> => {
  try {
    const event = await Event.findByIdAndDelete(id);
    return true;
  } catch (error: any) {
    console.error("Error deleting event:", error.message);
    throw new Error("Failed to delete event");
  }
};

export const updateEventById = async (
  id: string,
  req: Request
): Promise<boolean> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return true;
  } catch (error: any) {
    console.error("Error updating event:", error.message);
    throw new Error("Failed to update event");
  }
};

export const markEventAsCanceled = async (
  id: string,
  currentUser: IUser
): Promise<IEvent | null> => {
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { status: EventStatus.CANCELED },
      { new: true }
    );
    return event;
  } catch (error: any) {
    console.error("Error cancelling event:", error.message);
    throw new Error(error.model.message);
  }
};

export const cancel = async (
  bookingId: string,
  currentUser: IUser
): Promise<boolean> => {
  try {
    const bookingIndex = currentUser.bookings.findIndex(
      (booking: any) => booking === bookingId
    );

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    currentUser.bookings.splice(bookingIndex, 1);

    await currentUser.save();
    await Booking.findByIdAndDelete(bookingId);

    return true;
  } catch (error: any) {
    console.error("Error cancelling booking:", error.message);
    throw new Error(error.message);
  }
};
export const book = async (
  id: string,
  numTickets: number,
  currentUser: IUser
): Promise<boolean> => {
  try {
    const event = await Event.findById(id);

    if (event!.numTickets < numTickets) {
      throw new Error("Not enough tickets available");
    }

    const newBooking = await Booking.create({
      user: currentUser._id,
      event,
      numTickets,
    });

    event!.numTickets -= numTickets;
    await event!.save();

    currentUser.bookings.push(newBooking._id);
    await currentUser.save();

    return true;
  } catch (error: any) {
    console.error("Error booking event:", error.message);
    throw new Error(error.message);
  }
};
