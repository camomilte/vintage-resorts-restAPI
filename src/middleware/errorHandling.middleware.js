/// /
// Centralized error handling
/// /
const errorHandling = (err, req, res, next) => {
  // Console log error stack
  console.log(err.stack);

  // Use status code if provided, else set to 500
  const status = err.status || 500;

  // Use provided type or default if none is provided
  const type = err.type || "https://example.com/internal-server-error";

  // Provide standard error titles based on status code
  const title =
    status === 400
      ? "Bad Request"
      : status === 401
      ? "Unauthorized"
      : status === 403
      ? "Forbidden"
      : status === 404
      ? "Not Found"
      : status === 408
      ? "Request Timeout"
      : "Internal Server Error";
  
  // Provide with detail
  const detail = err.detail || err.message || "An unexpected error occurred.";

  // Send JSON error response
  res.status(status).json({
    title,                     // Human-readable summary
    status,                    // HTTP status code
    type,                      // Link or identifier for error type
    detail,                    // More specific error detail
    instance: req.originalUrl  // Path that triggered the error
  });
};

// Export error handling
export default errorHandling;