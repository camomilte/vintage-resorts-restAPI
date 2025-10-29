export const validateBody = (schema) => (req, res, next) => {
  // Validate the request body against the provided schema
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  // If there are validation errors
  if (error) {
    // Map over all Joi error details and extract info
    const details = error.details.map((d) => ({
      field: d.path.join("."), 
      message: d.message,     
    }));

    const validationError = new Error("Invalid request body");
    validationError.status = 400;
    validationError.type = "https://example.com/validation-error";
    validationError.detail = details;
    return next(validationError);
  }

  next();
};