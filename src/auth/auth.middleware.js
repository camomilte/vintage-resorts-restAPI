import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if token exists and starts with "Bearer "
    if(!authHeader?.startsWith('Bearer ')) {

      // Throw error if token is invalid or does not exist
      const error = new Error("Access token missing or invalid");
      error.status = 401;
      error.type = "https://example.com/unauthorized";

      // Pass to middleware
      return next(error);

    }

    // Extract token and removing "Bearer 
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = decoded;

    // Continue to the next middleware or controller
    next();

  } catch (err) {
    // Handle expired token
    if (err.name === "TokenExpiredError") {
      const error = new Error("Access token has expired");
      error.status = 401;
      error.type = "https://example.com/expired-token";
      
      return next(error);
    }

    // Handle invalid token
    const error = new Error("Invalid authentication token");
    error.status = 401;
    error.type = "https://example.com/invalid-token";
    error.title = "Invalid Token";
    next(error);
  }
};

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {

    // Check if user has a role
    if(!req.user.role) {
      const error = new Error("This user has no role assigned")
      error.status = 403;
      error.type = "https://example.com/role-missing";

      return next(error);
    };

    // Check if role is allowed
    if(!allowedRoles.includes(req.user.role)) {
      const error = new Error("Role does not have access or permission");
      error.status = 403;
      error.type = "https://example.com/access-denied";
      return next(error);
    };

    // Continue to the next middleware or controller
    next();
  }
};