import { Router } from "express";
import {
  deleterUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  userAuthentication,
  userRegistration,
} from "../controllers/userController";
import { isUserFound } from "../middlewares/isUserFound";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, isAdmin, getAllUsers);
userRoutes.get("/:id", isUserFound, isAuthenticated, isAdmin, getSingleUser);
userRoutes.put("/:id", isUserFound, isAuthenticated, isAdmin, updateUser);
userRoutes.delete("/:id", isUserFound, isAuthenticated, isAdmin, deleterUser);
userRoutes.post("/register", userRegistration);
userRoutes.post("/login", userAuthentication);

export default userRoutes;
