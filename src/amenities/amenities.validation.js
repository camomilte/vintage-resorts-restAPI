import Joi from "joi";

/// /
// Schema for creating new amenity
/// /
export const createAmenitySchema = Joi.object({
  amenity_name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Amenity name must be a string",
      "string.min": "Amenity name must be at least 2 characters long",
      "string.max": "Amenity name cannot be longer than 100 characters",
      "any.required": "Amenity name is required"
    }),

  description: Joi.string()
    .min(2)
    .max(200)
    .optional()
    .messages({
      "string.min": "Description must be at least 2 characters long",
      "string.max": "Descriptopn cannot exceed 200 characters",
    })
});