import { Router } from "express";
import {
  deleterUser,
  getAllUsers,
  getSingleUser,
  getUserBookings,
  updateUser,
  userAuthentication,
  userRegistration,
} from "../controllers/userController";
import { isUserFound } from "../middlewares/isUserFound";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { userExists } from "../middlewares/userExists";
import { verifyToken } from "../middlewares/verifyToken";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, isAdmin, getAllUsers);
userRoutes.get("/:id", isUserFound, isAuthenticated, isAdmin, getSingleUser);
userRoutes.get("/:id/books", isUserFound, getUserBookings);
userRoutes.put("/:id", isUserFound, isAuthenticated, isAdmin, updateUser);
userRoutes.delete("/:id", isUserFound, isAuthenticated, isAdmin, deleterUser);
userRoutes.post("/register", userExists, userRegistration);
userRoutes.post("/login", userAuthentication);
userRoutes.post("/verify", verifyToken);

export default userRoutes;
