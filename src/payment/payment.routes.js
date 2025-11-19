import express from 'express';

// Initialize router for payment endpoints
const paymentRouter = express.Router();

paymentRouter.post("/user/:user_id/")