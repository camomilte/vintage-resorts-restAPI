import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "./user.service.js";
import handleResponse from '../middleware/responseHandling.middleware.js';

/// / 
// Create user
/// /
export const createUser = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth } = req.body;

    //TODO: Add logic that checks that email is not already in use

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
    if (!user) {
      const error = new Error("User could not be found");
      error.status = 404;
      error.type = "http://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

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
    if (isNaN(userId)) {
      const error = new Error("Invalid user ID. User id must be a valid number");
      error.status = 400;
      error.type = "http://example.com/invalid-input";

      // Pass to middleware
      return next(error);
    }

    // Check if user id exists
    if (!userId) {
      const error = new Error("User could not be found");
      error.status = 404;
      error.type = "http://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

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
    // Get user id
    const { user_id } = req.params;

    // Call service to delete user
    const deletedUser = await deleteUserService(user_id);

    // If user is not found, throw error
    if(!deletedUser) {
      const error = new Error("User could not be found");
      error.status = 404;
      error.type = "https://example.com/resource-not-found";

      // Pass to middleware
      return next(error);
    }

    // Success repsonse
    handleResponse(res, 200, "User deleted successfully", deleteUser);

  } catch (err) {
    next(err)
  }
};