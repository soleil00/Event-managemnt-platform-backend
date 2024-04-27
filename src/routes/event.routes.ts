import { Router } from "express";
import {
  bookEvent,
  cancelBooking,
  cancelEvent,
  createNewEvent,
  deleteSingleEvent,
  getAllEvents,
  getSingleEvent,
  updateSingleEvent,
} from "../controllers/eventController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { isEventFound } from "../middlewares/isEventFound";
import uploadService from "../utils/multer";
import { isImageAvailable } from "../middlewares/isImageAvailable";

const eventRoutes = Router();
eventRoutes.get("/", getAllEvents);
eventRoutes.post(
  "/register-event",
  uploadService.single("image"),
  isImageAvailable,
  isAuthenticated,
  isAdmin,
  createNewEvent
);
eventRoutes.get("/:id", isEventFound, getSingleEvent);
eventRoutes.delete("/:id", isAuthenticated, isAdmin, deleteSingleEvent);
eventRoutes.put("/:id", isAuthenticated, isAdmin, updateSingleEvent);
eventRoutes.put("/:id/cancel", isEventFound, cancelEvent);
eventRoutes.post("/:id/cancel-booking", isEventFound, cancelBooking);
eventRoutes.post("/:id/book", isAuthenticated, isEventFound, bookEvent);

export default eventRoutes;
