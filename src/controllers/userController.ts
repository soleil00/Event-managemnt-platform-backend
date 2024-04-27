import { Request, Response } from "express";
import * as userServices from "../services/user.service";
import User from "../models/User";
import { generateUserToken } from "../utils/jwt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.findAllUsers();
    const count = await User.countDocuments();

    count > 0
      ? res.status(200).json({
          message: "Users fetched successfully",
          count,
          users,
        })
      : res.status(404).json({
          message: "No users found",
        });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const userRegistration = async (req: Request, res: Response) => {
  const { email, username, password, isAdmin } = req.body;
  try {
    const newUser = await userServices.registerNewUser({
      email,
      username,
      password,
      isAdmin,
    });
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const userAuthentication = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userServices.loginUser(email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const isPasswordMatch = user.password === password;
    if (!isPasswordMatch) {
      return res.status(409).json({
        status: 409,
        message: "invalid credentials",
      });
    } else {
      const token = await generateUserToken(user);
      return res.status(200).json({
        status: 200,
        message: "Login successful",
        token,
        user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userServices.getUserById(id);
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleterUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userServices.deleteUserById(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      //@ts-ignore
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "successfuly update dyour profile", user: updatedUser });
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
