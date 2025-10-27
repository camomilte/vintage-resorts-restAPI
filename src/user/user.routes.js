import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller.js';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';

// Initialize router for user-related endpoints
const userRouter = express.Router();

// Create new user
userRouter.post("/users", validateBody(createUserSchema), createUser); 

// Get all users
userRouter.get("/users", getAllUsers); 

// Get single user by id
userRouter.get("/users/:user_id", getUserById); 

// Update user
userRouter.patch("/users/:user_id", validateBody(updateUserSchema), updateUser); 

// Delete user
userRouter.delete("/users/:user_id", deleteUser); 

// Export router
export default userRouter;