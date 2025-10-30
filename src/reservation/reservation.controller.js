import express from 'express';
import handleResponse from '../middleware/responseHandling.middleware.js';
import { createReservationService, getAllReservationsUserService, getReservationByIdService } from './reservation.service.js';

/// /
// Create reservation
/// /
export const createReservation = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { listing_id, start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price } = req.body;

    // Get user from token
    const guest_id = req.user.user_id;

    // Call service to create reservation
    const newReservation = await createReservationService(guest_id, listing_id, start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price);

    // Success respone
    handleResponse(res, 201, "Reservation created successfully", newReservation);

  } catch (err) {
    next(err);
  }
};

/// /
// Get all reservations from a user
/// /
export const getAllReservationsUser = async (req, res, next) => {
  try {
    // Get user from params
    const guest_id = req.params.user_id;
  
    // Call service to fetch all reservations by user
    const reservations = await getAllReservationsUserService(guest_id);

    // If no reservations are found, return error
    if(!reservations) {
      const error = new Error("Reservations could not be found");
      error.status = 404;
      error.type = "https://example.com/not-found";
      
      // Pass to middleware
      return next(error);
    };
  
    // Success response
    handleResponse(res, 200, `Reservations from user:${guest_id}`, reservations);
    
  } catch (err) {
    next(err);
  }
};

/// /
// Get single resvation by reservation id
/// /
export const getReservationById = async (req, res, next) => {
  try {
    // Get user from params
    const guest_id = req.params.user_id;
    // Get resvation from params
    const resv_id = req.params.resv_id;

    // Call service to fetch reservation
    const reservation = await getReservationByIdService(guest_id, resv_id);

    // If no reservation is found, return error
    if(!reservation) {
      const error = new Error("Reservation could not be found");
      error.status = 404;
      error.type = "https://example.com/not-found";
      
      // Pass to middleware
      return next(error);
    };

    // Success response
    handleResponse(res, 200, "Reservation fetched", reservation);

  } catch (err) {
    next(err);
  }
};

export const updateReservation = async () => {

}

export const getAllReservationsListing = async () => {

}
export const deleteReservation = async () => {

}
