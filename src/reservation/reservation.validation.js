import Joi from 'joi';

// Calculate to days from now
const twoDaysFromNow = new Date();
twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);


/// /
// Schema for creating new reservation
/// /
export const createReservationSchema = Joi.object({
  guest_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "guest_id must be a number",
      "any.required": "guest_id is required"
    }),
  
  listing_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "listing_id must be a number",
      "any.required": "listing_id is required"
    }),
  
  start_date: Joi.date()
    .iso()
    .min(twoDaysFromNow)
    .required()
    .messages({
      "date.base": "start_date must be a valid Iso date",
      "date.min": "start_date must be at least two days from now",
      "any.required": "start_date is required"
    }),

  end_date: Joi.date()
    .iso()
    .min(Joi.ref('start_date'))
    .max(Joi.ref('startDate', { adjust: (value) => {
      const max = new Date(value);
      max.setMonth(max.getMonth() + 6);
      return max;
    }}))
    .required()
    .messages({
      "date.base": "end_date must be a valid Iso date",
      "date.min": "end_date cannot be less than start_date",
      "date.max": "end_date cannot be more than 6 month from start_date",
      "any.required": "end_date is required"
    }),

  num_adults: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "num_adults must be a number",
      "number.min": "num_adults must be at least 1",
      "any.required": "num_adults is required",
    }),

  num_children: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "num_children must be a number",
      "number.min": "num_children cannot be negative"
    }),

  num_infants: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "num_infants must be a number",
      "number.min": "num_infants cannot be negative"
    }),

  num_pets: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "num_pets must be a number",
      "number.min": "num_pets cannot be negative"
    }),
  
  total_price: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "total_price must be a number",
      "number.positive": "total_price must be greater than 0",
      "any.required": "total_price is required"
    }),
  
  payment_method: Joi.string()
    .valid('PayPal', 'Debit', 'Klarna', 'Google_Pay', 'Swish')
    .required()
    .messages({
      "any.required": "payment_method is required",
      "any.valid": "payment_method must be one of following: PayPal, Debit, Klarna, Google_Pay, Swish"
    }),
});

/// /
// Schema for updating reservation
/// /
export const updateReservationSchema = Joi.object({

})