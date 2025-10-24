export const validateBody = (schema) => (req, res, next) => {
  // Validate the request body against the provided schema
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  // If there are validation errors
  if (error) {
    return res.status(400).json({
      type: "https://example.com/validation-error",
      title: "Invalid request body",
      status: 400,
      detail: error.details.map(d => d.message)
    });
  }

  next();
};