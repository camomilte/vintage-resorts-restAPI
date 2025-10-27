import { loginService, registerService } from "./auth.service.js";

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

export const registerUser = async (req, res, next) => {
try {
    // Destructure fields from request body
    const { first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth } = req.body;

    // Call service to create user
    const newUser = await registerService(first_name, last_name, email, password, phone_number, bio, profile_picture_url, date_of_birth);

    // Success response
    handleResponse(res, 201, "User registered successfully", newUser)

  } catch (err) {
    // Pass error to errorhandler
    next(err);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    // Destructure fields from request body
    const { email, password } = req.body;
  
    // Validate required fields
    if(!email || !password) {
      const error = new Error("One or more fields are missing/empty");
      error.status = 400;
      error.type = "https://example.com/missing-field";
      throw error;
    };

    // Call login service
    const { token, user } = await loginService(email, password);

    // Success response
    handleResponse(res, 200, "Login successful", { token })

  } catch (err) {
    next(err);
  }
}