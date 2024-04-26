import { NextFunction, Request, Response } from "express";
import Event from "../models/Event";

export const isEventFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);

    if (!event) {
      throw new Error("Event not found");
    }

    next();
  } catch (error) {}
};
