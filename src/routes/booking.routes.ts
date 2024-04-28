import { Router } from "express";
import {
  cancelBooking,
  getAllBookings,
} from "../controllers/bookingController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { isBookingFound } from "../middlewares/isBookingFound";

const bookingsRoutes = Router();

bookingsRoutes.get("/", isAuthenticated, getAllBookings);
bookingsRoutes.post(
  "/:id/cancel-booking",
  isAuthenticated,
  isBookingFound,
  cancelBooking
);

export default bookingsRoutes;
