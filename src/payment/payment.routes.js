import express from 'express';
import { verifyToken } from '../auth/auth.middleware.js';
import { createPayment } from './payment.controller.js';
import { validateBody } from '../middleware/validateBody.middleware.js';

// Initialize router for payment endpoints
const paymentRouter = express.Router();

// Create new payment
paymentRouter.post("/users/:user_id/pay", verifyToken, createPayment, validateBody());

// Export router
export default paymentRouter;