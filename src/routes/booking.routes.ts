import { Router } from "express";
import { getAllBookings } from "../controllers/bookingController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const bookingsRoutes = Router();

bookingsRoutes.get("/", isAuthenticated, isAdmin, getAllBookings);

export default bookingsRoutes;
