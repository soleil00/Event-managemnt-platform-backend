import { Request } from "express";
import { IEvent } from "../utils/types";
import Event from "../models/Event";

export const getAllEvents = async (): Promise<IEvent[]> => {
  try {
    const events = await Event.find();
    return events;
  } catch (error: any) {
    console.error("Error fetching events:", error.message);
    throw new Error("Failed to fetch events");
  }
};

export const createEvent = async (req: Request): Promise<IEvent> => {
  try {
    const newEvent = await Event.create(req.body);
    return newEvent;
  } catch (error: any) {
    console.error("Error creating event:", error.message);
    throw new Error("Failed to create event");
  }
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error: any) {
    console.error("Error fetching event by ID:", error.message);
    throw new Error("Failed to fetch event");
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

export const cancelEvent = async (id: string): Promise<boolean> => {
  try {
    // Implement cancellation logic here
    // Example: Set event status to 'CANCELED'
    return true; // Placeholder for successful cancellation
  } catch (error: any) {
    console.error("Error cancelling event:", error.message);
    throw new Error("Failed to cancel event");
  }
};

export const bookEvent = async (
  id: string,
  numTickets: number
): Promise<boolean> => {
  try {
    const event = await Event.findById(id);

    // if (!event) {
    //   throw new Error("Event not found");
    // }

    if (event!.numTickets < numTickets) {
      throw new Error("Not enough tickets available");
    }

    event!.numTickets -= numTickets;
    await event!.save();

    return true;
  } catch (error: any) {
    console.error("Error booking event:", error.message);
    throw new Error("Failed to book event");
  }
};
