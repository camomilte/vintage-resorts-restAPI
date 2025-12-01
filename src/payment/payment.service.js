import pool from "../../config/db.js";

export const createPaymentService = async (reservation_id, amount, payment_method) => {

  // Execute SQL query to insert values in the 'payments' table
  const result = await pool.query(
    "INSERT INTO payment (reservation_id, amount, payment_method) VALUES ($1, $2, $3) RETURNING *;",
    [reservation_id, amount, payment_method]
  );

  // Return created payment
  return result.rows[0]
};