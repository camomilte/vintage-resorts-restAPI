import express from 'express';
import { verifyToken } from '../auth/auth.middleware';
import { validateBody } from '../middleware/validateBody.middleware';

// Initialize router for reservation endpoints
const resvRouter = express.Router();

// Create new reservation
resvRouter.post("/", verifyToken, createReservation, validateBody(createReservationSchema));

// Get all reservation (optionally filtered by user)
resvRouter.get("/", getAllReservations);

// Get reservation by resv_id
resvRouter.get("/:resv_id", getReservationById);

// Update reservation
resvRouter.patch("/:resv_id", verifyToken, updateReservation, validateBody(updateReservationSchema));

// Delete reservation
resvRouter.delete("/:resv_id", verifyToken, deleteReservation);

// Export router
export default resvRouter;