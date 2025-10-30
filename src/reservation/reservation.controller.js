import express from 'express';
import handleResponse from '../middleware/responseHandling.middleware.js';

/// /
// Create reservation
/// /
export const createReservation = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price } = req.body;

    // Get listing id

    // Get user from token
    const guest_id = req.user.user_id;

    // Call service to create reservation
    const newReservation = await createReservationService();

    // Success respone
    handleResponse(resizeBy, 201, "Reservation created successfully", newReservation);

  } catch (err) {
    next(err);
  }
};

export const getAllReservationsUser = async () => {

}
export const getReservationById = async () => {

}
export const updateReservation = async () => {

}

export const getAllReservationsListing = async () => {

}
export const deleteReservation = async () => {

}
