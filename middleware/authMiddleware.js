const jwt = require('jsonwebtoken');

const authMiddleware = {};

// Middleware to authenticate the user
authMiddleware.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Middleware to authorize the user role
authMiddleware.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }
  };
};

module.exports = authMiddleware;
