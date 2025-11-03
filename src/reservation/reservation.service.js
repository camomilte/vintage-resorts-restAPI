import pool from '../../config/db.js';

/// /
// Create new resrevation service
/// /
export const createReservationService = async (guest_id, listing_id, start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price) => {
  
  // Execute SQL query to insert values to 'reservations' table
  const result = await pool.query(
    "INSERT INTO reservations (guest_id, listing_id, start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
    [guest_id, listing_id, start_date, end_date, num_adults, num_children, num_infants, num_pets, total_price]
  );

  // Return created reservation
  return result.rows[0];
};

/// /
// Get all reservations from a user service
/// /
export const getAllReservationsUserService = async (guest_id) => {
  // Execute SQL query to get all reservations from a user
  const result = await pool.query(
    "SELECT * FROM reservations WHERE guest_id = $1",
    [guest_id]
  );
  // Return array
  return result.rows;
};

/// /
// Get reservation by resv_id service
/// /
export const getReservationByIdService = async (guest_id, resv_id) => {
  // Execute SQL query to get reservation by reservation id and user
  const result = await pool.query(
    "SELECT * FROM reservations WHERE guest_id = $1 AND reservation_id = $2",
    [guest_id, resv_id]
  );

  // If no reservations exist, return null
  if (result.rows.length === 0) {
    return null;
  }

  // If found, return reservation
  return result.rows[0];
};

/// /
// Delete reservation
/// /
export const deleteReservationService = async (guest_id, resv_id) => {
  // Check if reservation exists 
  const reservation = await pool.query(
    "SELECT * FROM reservations WHERE guest_id = $1 AND reservation_id = $2",
    [guest_id, resv_id]
  );

  // If no reservation exists retunr null
  if (reservation.rows.length === 0) {
    return null;
  }

  // If it exists, delete it
  await pool.query("DELETE FROM reservations WHERE reservation_id = $1", [resv_id]);

  // Return deleted reservation
  return reservation.rows[0];
};