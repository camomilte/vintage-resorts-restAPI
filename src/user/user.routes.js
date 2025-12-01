import express from 'express';
import { createUser, deleteUser, getAllUsers, getMe, getUserById, updateUser } from './user.controller.js';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';
import { verifyToken } from '../auth/auth.middleware.js';

// Initialize router for user-related endpoints
const userRouter = express.Router();

// Create new user
userRouter.post("/users", validateBody(createUserSchema), createUser); 

// Get all users
userRouter.get("/users", verifyToken, getAllUsers); 

// Get current user
userRouter.get("/users/me", verifyToken, getMe);

// Get single user by id
userRouter.get("/users/:user_id", getUserById, verifyToken); 

// Update user
userRouter.patch("/users/:user_id", validateBody(updateUserSchema), verifyToken, updateUser); 

// Delete user
userRouter.delete("/users/:user_id", verifyToken, deleteUser); 

// Export router
export default userRouter;