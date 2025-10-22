import express from 'express';
import { createUser, getAllUsers, getUserById } from './user.controller.js';

// Initialize router for user-related endpoints
const userRouter = express.Router();

userRouter.post("/user", createUser); // Create new user
userRouter.get("/user", getAllUsers); // Get all users

userRouter.get("/user/:user_id", getUserById); // Get single user by id
/* userRouter.put("/user/:id", updateUser); // Update user
userRouter.delete("/user/:id", deleteUser); // Delete user
 */
// Export router
export default userRouter;