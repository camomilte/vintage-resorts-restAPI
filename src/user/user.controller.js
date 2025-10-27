import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "./user.service.js";
import handleResponse from '../middleware/responseHandling.middleware.js';

/// / 
// Create user
/// /
export const createUser = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth } = req.body;

    // Call service to create user
    const newUser = await createUserService(first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth);

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

/// /
// Update user
/// /
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.user_id;

    // Validate user Id
    if (isNaN(userId)) return handleResponse(res, 400, "invalid user ID");

    // Check if user id exists
    if(!userId) return handleResponse(res, 404, "User not found!");

    // Call service to update user
    const updatedUser = await updateUserService(userId, req.body);

    // Success response 
    handleResponse(res, 200, "User updated successfully", updatedUser);

  } catch (err) {
    // Pass error to error handler
    next(err)
  }
};

/// /
// Delete user
/// /
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserService(req.params.user_id);
    handleResponse(res, 200, "User deleted successfully", deleteUser);
  } catch (err) {
    next(err)
  }
};