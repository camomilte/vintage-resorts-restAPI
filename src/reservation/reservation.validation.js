import Joi from 'joi';

/// /
// Schema for creating new reservation
/// /
export const createReservationSchema = Joi.object({
  guest_id: Joi.number()
    .integer()
    .required()
    .messages({

    }),
  
  listing_id: Joi.number()
    .integer()
    .required()
    .messages({

    }),
  
  start_date: Joi.date()
    .iso()
    .less(minToday)
    .required()
    .messages({

    }),

  end_date: Joi.date()
    .iso()
    .max(aFewMonthsOrSo)
    .required()
    .messages({

    }),

  num_adults: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({

    }),

  num_children: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({

    }),

  num_infants: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({

    }),

  num_pets: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({

    }),
  
  total_price: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({

    }),

  status: Joi.string()
    .required()
    .messages({

    })

});