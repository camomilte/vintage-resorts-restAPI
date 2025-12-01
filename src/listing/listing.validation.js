import Joi from "joi";

/// /
// Schema for creating new listing
/// /
export const createListingSchema = Joi.object({
  host_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "host_id must be a number",
      "any.required": "host_id is required"
    }),

  title: Joi.string()
    .min(5)
    .max(150)
    .required()
    .messages({
      "string.min": "Title must consist of at least 5 characters",
      "string.max": "Title cannot exceed 150 characters",
      "any.required": "Title is required" 
    }),

  description: Joi.string()
    .min(10)
    .max(3000)
    .required()
    .messages({
      "string.min": "Description must consist of at least 10 characters",
      "string.max": "Description cannot exceed 3000 characters.",
      "any.required": "Description is required" 
    }),

  address: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.min": "Address must consist of at least 5 characters",
      "string.max": "Address cannot exceed 255 characters.",
      "any.required": "Address is required" 
    }),

  city: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.max": "City cannot exceed 100 characters.",
      "any.required": "City is required" 
    }),

  country: Joi.string()
    .max(100)
    .required()
    .messages({
      "string.max": "Country cannot exceed 100 characters.",
      "any.required": "Country is required" 
    }),

  price_per_night: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
      "any.required": "Price is required",
    }),

  max_adults: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Max adults must be a number",
      "number.min": "Max adults must be at least 1",
      "any.required": "Max adults is required",
    }),
    
  max_children: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "Max children must be a number",
      "number.min": "Max children cannot be negative"
    }),

  max_infants: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "Max infants must be a number",
      "number.min": "Max infants cannot be negative"
    }),

  max_pets: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "Max pets must be a number",
      "number.min": "Max pets cannot be negative"
    }),
  
  num_bedrooms: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Number of bedrooms must be a number",
      "number.min": "you must have at least one bedroom",
      "any.required": "Number of bedroom is required"
    }),

  num_bathrooms: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Number of bathrooms must be a number",
      "number.min": "You must have at least one bathroom",
      "any.required": "Number of bathrooms is required"
    }),

  num_beds: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Number of beds must be a number",
      "number.min": "You must have at least one bed",
      "any.required": "Number of bed is required"
    }),

  amenities: Joi.array()
    .items(Joi.number().integer().min(1))
    .optional()
    .messages({
      "array.base": "Amenities must be an array of numbers (IDs)",
      "number.base": "Each amenity must be a valid ID",
    }),

  pets_allowed: Joi.boolean()
    .required()
    .messages({
      "any.required": "pets_allowed is required"
    }),
  
  images: Joi.array()
    .items(Joi.string().uri()
    .required()
    .messages({
      "array.base": "Images must be an array of url",
      "string.base": "Each image must be string"
    }))
})