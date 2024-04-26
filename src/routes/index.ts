import { Router } from "express";
import userRoutes from "./user.routes";
import eventRoutes from "./event.routes";

const appRoutes = Router();

appRoutes.use("/users", userRoutes);
appRoutes.use("/events", eventRoutes);

export default appRoutes;
