import { Router } from "express";
import userRoutes from "./user.routes";
import eventRoutes from "./event.routes";
import bookingsRoutes from "./booking.routes";

const appRoutes = Router();

appRoutes.use("/users", userRoutes);
appRoutes.use("/events", eventRoutes);
appRoutes.use("/bookings", bookingsRoutes);

export default appRoutes;
