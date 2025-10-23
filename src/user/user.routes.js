import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller.js';

// Initialize router for user-related endpoints
const userRouter = express.Router();

userRouter.post("/user", createUser); // Create new user
userRouter.get("/user", getAllUsers); // Get all users

userRouter.get("/user/:user_id", getUserById); // Get single user by id
userRouter.put("/user/:user_id", updateUser); // Update user
userRouter.delete("/user/:user_id", deleteUser); // Delete user

// Export router
export default userRouter;