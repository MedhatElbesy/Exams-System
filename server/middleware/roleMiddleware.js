const roleMiddleware = (req, res, next) => {
  // Check if user exists in request (added by authMiddleware)
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden: User is not an admin" });
  }

  // If user is admin, proceed to the next middleware or route handler
  next();
};

module.exports = roleMiddleware;
