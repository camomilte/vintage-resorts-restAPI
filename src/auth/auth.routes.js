import express from 'express';
import { loginUser, registerUser } from './auth.controller.js';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createUserSchema } from '../user/user.validation.js';

// Initialize router for auth-related endpoints
const authRouter = express.Router();

// Register new user
authRouter.post("/users/register", validateBody(createUserSchema), registerUser);

// Login user
authRouter.post("/auth/login", loginUser);

// Export router
export default authRouter;