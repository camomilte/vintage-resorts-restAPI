import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if token exists and starts with "Bearer "
    if(!authHeader?.startsWith('Bearer ')) {

      // Throw error if token is invalid or does not exist
      return res.status(401).json({
        type: "https://example.com/unauthorized",
        title: "Unauthorized",
        status: 401,
        detail: "Access token is missing or invalid",
      });
    }

    // Extract token and removing "Bearer 
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = decoded;

    // Continue to the next middleware or controller
    next();

  } catch (error) {
    // Handle expired or invalid token
    return res.status(401).json({
      type: "https://example.com/invalid-token",
      title: "Invalid or Expired Token",
      status: 401,
      detail: err.message,
    });    
  }
};

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {

    // Check if user has a role
    if(!req.user.role) {
      return res.status(403).json({ 
        type: "https://example.com/role-missing",
        title: "No role assigned",
        status: 403,
        detail: err.message
      });
    };

    // Check if role is allowed
    if(!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        type: "https://example.com/access-denied",
        title: "Role does not have access",
        status: 403,
        detail: err.message
      });
    };

    // Continue to the next middleware or controller
    next();
  }
};