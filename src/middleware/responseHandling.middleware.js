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

// Export error handling
export default handleResponse;