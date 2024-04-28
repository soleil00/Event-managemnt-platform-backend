import Booking from "../models/Booking";
import User from "../models/User";
import { IUser, IUserData } from "../utils/types";

export const findAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error: any) {
    console.error("Error fetching all users:", error.message);
    throw new Error("Failed to fetch all users");
  }
};

export const registerNewUser = async (userData: IUserData): Promise<IUser> => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error: any) {
    console.error("Error registering new user:", error.message);
    throw new Error(error.message);
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id).populate({
      path: "bookings",
      populate: { path: "event" },
    });
    return user;
  } catch (error: any) {
    console.error("Error fetching user by ID:", error.message);
    throw new Error(error.message);
  }
};

export const deleteUserById = async (id: string): Promise<boolean> => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return !!deletedUser;
  } catch (error: any) {
    console.error("Error deleting user by ID:", error.message);
    throw new Error("Failed to delete user by ID");
  }
};

export const updateUserById = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error: any) {
    console.error("Error updating user by ID:", error.message);
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    const bookings = await Booking.find({ user: user?._id }).populate("event");
    return { user, bookings };
  } catch (error: any) {
    console.error("Error fetching user by email:", error.message);
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
  } catch (error) {}
};
