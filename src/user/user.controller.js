import { createUserService, getAllUsersService, getUserByIdService, updateUserService } from "./user.model.js";

/// /
// Standardized response function
/// /
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data
  });
};

/// / 
// Create user
/// /
export const createUser = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, date_of_birth } = req.body;

    // Call service to create user
    const newUser = await createUserService(first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url, date_of_birth);

    // Success response
    handleResponse(res, 201, "User created successfully", newUser)

  } catch (err) {

    // Pass error to errorhandler
    next(err);
  }
};

/// /
// Get all users
/// /
export const getAllUsers = async (req, res, next) => {
  try {
    // Call service to fetch all users
    const users = await getAllUsersService();

    // Success response
    handleResponse(res, 200, "Users fetched successfully", users)
    
  } catch (err) {

    // Pass error to error handler
    next(err);
  }
};

/// /
// Get single user by id
/// /
export const getUserById = async (req, res, next) => {
  try {
    // Call service to fecth user by id
    const user = await getUserByIdService(req.params.user_id);

    // If no user is found, return error
    if(!user) return handleResponse(res, 404, "User not found!");

    // Success response
    handleResponse(res, 200, "User fetched successfully", user);

  } catch (err) {

    // Pass error to error handler
    next(err);
  }
};

// TODO: Update so thhat unedited fields remain untouched
/// /
// Update user
/// /
export const updateUser = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url } = req.body;
    
    // Call service to update user
    const user = await updateUserService(req.params.user_id, first_name, last_name, email, password_hash, phone_number, bio, profile_picture_url);

    // Check if user exists
    if(!user) return handleResponse(res, 404, "User not found!");

    // Success response 
    handleResponse(res, 200, "User updated successfully", user);

  } catch (err) {
    // Pass error to error handler
    next(err)
  }
};