import Joi from "joi";

export const createPaymentSchema = Joi.object({
  reservation_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "reservation_id must be a number",
      "any.required": "reservation_id is required"
    }),
  
  amound: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "amount must be a number",
      "number.positive": "amount must be greater than 0",
      "any.required": "amount is required"
    }),

  payment_method: Joi.string()
    .valid('PayPal', 'Debit', 'Klarna', 'Google_Pay', 'Swish')
    .required()
    .messages({
      "any.required": "payment_method is required",
      "any.valid": "payment_method must be one of following: PayPal, Debit, Klarna, Google_Pay, Swish"
    })
})