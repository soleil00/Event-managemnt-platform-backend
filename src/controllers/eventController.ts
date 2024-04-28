import { Request, Response } from "express";
import * as eventServices from "../services/event.service";
import { IUser } from "../utils/types";
import Event from "../models/Event";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventServices.findAllEvents();
    const count = await Event.countDocuments();
    count > 0
      ? res.status(200).json({
          message: "Events fetched successfully",
          count,
          events,
        })
      : res.status(404).json({
          message: "No events found",
        });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const createNewEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await eventServices.registerEvent(req);
    res.status(201).json({
      status: 201,
      message: "Event created successfully",
      newEvent,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSingleEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await eventServices.getEventById(id);

    return res.status(200).json({
      message: "Event found",
      event,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const deleteSingleEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isDeleted = await eventServices.deleteEventById(id);

    if (isDeleted) {
      return res.status(200).json({
        message: "Event deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateSingleEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedEvent = await eventServices.updateEventById(id, req);

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const cancelEvent = async (req: any, res: Response) => {
  const currentUser: IUser = req.currentUser;
  const { id } = req.params;
  try {
    const event = await eventServices.markEventAsCanceled(id, currentUser);

    if (event) {
      return res.status(200).json({
        message: "Event cancelled successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const cancelBooking = async (req: any, res: Response) => {
  const currentUser: IUser = req.currentUser;
  const { id } = req.params;
  try {
    const isCancelled = await eventServices.cancel(id, currentUser);

    if (isCancelled) {
      return res.status(200).json({
        message: "Booking cancelled successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const bookEvent = async (req: any, res: Response) => {
  const currentUser: IUser = req.currentUser;
  const { id } = req.params;
  try {
    const { numTickets } = req.body;
    const isBooked = await eventServices.book(id, numTickets, currentUser);

    if (!currentUser) {
      return res.status(200).json({
        message: "missing current User in book event",
      });
    }

    if (isBooked) {
      return res.status(200).json({
        message: "Event booked successfully",
      });
    }
  } catch (error: any) {
    if (error.message === "Not enough tickets available") {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
