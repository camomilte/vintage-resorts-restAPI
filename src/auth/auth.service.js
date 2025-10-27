import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/// / 
// Register user 
/// / 
export const registerService = async (first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth) => {
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
// Log in user
/// /
export const loginService = async (email, password) => {
  // Find user by email
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  // If user not found
  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    error.type = "https://example.com/invalid-credentials";
    throw error;
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    error.type = "https://example.com/invalid-credentials";
    throw error;
  }


  // Create auth token
  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Return data + token
  return {
    token,
    user: { user_id: user.user_id }
  }
};
