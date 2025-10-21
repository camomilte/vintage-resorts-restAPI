import pool from "../config/db";

/// /
// Get all users  
/// /
export const getAllUsersService = async () => {
  // Execute SQL query to select all users from "users" table
  const result = await pool.query("SELECT * FROM users");
  // Return array
  return result.rows;
};

/// /
// Get user by Id
/// /
export const getUserByIdSevice = async (user_id) => {
  // Execute SQL query to find user by user_id
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
  // Return the first (and only) user found
  return result.rows[0];
};

/// / 
// Create user
/// /
export const createUserSevice = async (first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, date_of_birth) => {
  // Execute SQL query to insert values to users table
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, date_of_birth]
  );
  // Return created user
  return result.rows[0];
};

/// /
// Update existing user
/// /
export const updateUserSevice = async (first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, user_id) => {
  // Execute SQL query to update user details by user_id
  const result = await pool.query(
    "UPDATE users SET first_name=$1, last_name=$2, email=$3, password_hash=$4, phone_number=$5, bio=$6, profile_picture_url=$7 WHERE user_id=$8 RETURNING *",
    [first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, user_id]
  );
  // Return updated user
  return result.rows[0];
};

/// /
// Delete user
/// /
export const deleteUserSevice = async (user_id) => {
  // Execute SQL query to delete a user from the user table by user_id
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [user_id]
  );
  // Return deleted user
  return result.rows[0];
};

