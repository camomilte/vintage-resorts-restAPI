import pool from "../../config/db.js";
import bcrypt from "bcrypt";

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
export const getUserByIdService = async (user_id) => {
  // Execute SQL query to find user by user_id
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
  // Return the first (and only) user found
  return result.rows[0];
};

/// / 
// Create user
/// /
export const createUserService = async (first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth) => {

  //TODO: Add logic that checks that email is not already in use
  
  // Hash password
  const password_hash = await bcrypt.hash(password, 10);

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
export const updateUserService = async (user_id, updates) => {
  // Check that fields to update are provided
  if (!updates || Object.keys(updates).length === 0) {
    throw new Error("No fields provided for update");
  }

  // Dynamic SQL query parts
  const setClauses = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(updates)) {
    // If value is undefined: skip
    if (value !== undefined) {
      // Add SET clause to query
      setClauses.push(`${key} = $${index}`);
      // Push values into values array
      values.push(value);
      // Increase index counter so next field gets corresponding placeholder number
      index++;
    }
  }

  // Check that there are fields to update provided
  if (setClauses.length === 0) {
    const error = new Error("No valid fields provided for update");
    error.status = 400;
    error.type = "https://example.com/missing-field";
    
    // Pass to middleware
    return next(error);
  }

  // Add user_id as final parameter
  values.push(user_id);

  // Build SQL query
  const query = `UPDATE users SET ${setClauses.join(", ")} WHERE user_id = $${index} RETURNING *;`;

  // Run query with values
  const result = await pool.query(query, values);

  // Return updated user
  return result.rows[0];
};

/// /
// Delete user
/// /
export const deleteUserService = async (user_id) => {
  // Execute SQL query to delete a user from the user table by user_id
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [user_id]
  );
  // Return deleted user
  return result.rows[0];
};

