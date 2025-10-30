import express from 'express';
import { verifyToken } from '../auth/auth.middleware.js';
import { validateBody } from '../middleware/validateBody.middleware.js';
import { createReservationSchema, updateReservationSchema } from './reservation.validation.js';
import { createReservation, deleteReservation, getAllReservationsListing, getAllReservationsUser, getReservationById, updateReservation } from './reservation.controller.js';

// Initialize router for reservation endpoints
const resvRouter = express.Router();

// Create new reservation
resvRouter.post("/users/:user_id/reserv", verifyToken, createReservation, validateBody(createReservationSchema));

// Get reservation from a user
resvRouter.get("/users/:user_id/reservations", verifyToken, getAllReservationsUser);

// Get specific reservation
resvRouter.get("/users/:user_id/reservations/:resv_id", getReservationById);

// Update reservation
resvRouter.patch("/users/:user_id/reservations/:resv_id", verifyToken, updateReservation, validateBody(updateReservationSchema));

// Get all reservation from a listing
resvRouter.get("/listings/:listing_id/reservations", getAllReservationsListing);

// Delete reservation
resvRouter.delete("/users/:user_id/reservations/:resv_id", verifyToken, deleteReservation);

// Export router
export default resvRouter;
