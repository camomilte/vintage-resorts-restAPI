import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller.js';
import { validateBody } from '../middleware/validateBody.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';

// Initialize router for user-related endpoints
const userRouter = express.Router();

// Create new user
userRouter.post("/user", validateBody(createUserSchema), createUser); 

// Get all users
userRouter.get("/user", getAllUsers); 

// Get single user by id
userRouter.get("/user/:user_id", getUserById); 

// Update user
userRouter.patch("/user/:user_id", validateBody(updateUserSchema), updateUser); 

// Delete user
userRouter.delete("/user/:user_id", deleteUser); 

// Export router
export default userRouter;