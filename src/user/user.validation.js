import Joi from "joi";

// Calculate the cutoff date (users cannot be younger than 18)
const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

/// /
// Schema for creating new user
/// /
export const createUserSchema = Joi.object({

  first_name: Joi.string().min(2).max(50).required()
    .messages({
      "string.min": "First name must be at least 2 characters long",
      "any.required": "First name is required",
  }),

  last_name: Joi.string().min(2).max(50).required()
    .messages({
      "string.min": "Last name must be at least 2 characters long",
      "any.required": "Last name is required"
  }),

  email: Joi.string().email().required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
  }),

  phone_number: Joi.string().max(30).required()
    .pattern(/^[0-9+\-\s()]*$/)
    .messages({
      "string.pattern.base": "Phone number can only contain numbers and symbols ( +, -, (, ) )",
  }),

  bio: Joi.string().max(300).allow(null, ""),

  profile_picture_url: Joi.string().uri().allow(null, ""),

  date_of_birth: Joi.date().iso().required()
    .less(minAgeDate)
    .messages({
      "date.less": "User must be at least 18 years old.",
      "date.base": "Date of birth must be a valid ISO date."
    }),
});

/// /
// Schema for updating user
/// /
export const updateUserSchema = Joi.object({

  first_name: Joi.string().min(2).max(50)
    .messages({
      "string.min": "First name must be at least 2 characters long"
  }),

  last_name: Joi.string().min(2).max(50)
    .messages({
      "string.min": "Last name must be at least 2 characters long"
  }),

  email: Joi.string().email()
    .messages({
      "string.email": "Email must be a valid email address"
  }),

  password_hash: Joi.string().min(6)
    .messages({
      "string.min": "Password must be at least 6 characters long",
  }),

  phone_number: Joi.string().max(30)
    .pattern(/^[0-9+\-\s()]*$/)
    .messages({
      "string.pattern.base": "Phone number can only contain numbers and symbols ( +, -, (, ) )",
  }),

  bio: Joi.string().max(300).allow(null, ""),

  profile_picture_url: Joi.string().uri().allow(null, "")

}).min(1) // Require at least one field to update
  .messages({
    "object.min": "You must provide at least one field to update"
});