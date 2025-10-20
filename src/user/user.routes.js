import express from 'express';

// Initialize router for user-related endpoints
const userRouter = express.Router();

userRouter.post("/user", createUser); // Create new user
userRouter.get("/user", getAllUsers); // Get all users

userRouter.get("/user/:id", getUserById); // Get single user by id
userRouter.put("/user/:id", updateUser); // Update user
userRouter.delete("/user/:id", deleteUser); // Delete user

// Export router
export default userRouter;