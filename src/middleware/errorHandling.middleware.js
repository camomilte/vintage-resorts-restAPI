/// /
// Centralized error handling
/// /
const errorHandling = (err, req, res, next) => {
  // Console log error stack
  console.log(err.stack);

  // Set error status to 500 and set error message
  res.status(500).json({
    status: 500,
    error: err.message
  });
};

// Export error handling
export default errorHandling;