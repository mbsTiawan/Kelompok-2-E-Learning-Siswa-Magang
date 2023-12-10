// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = {};

authMiddleware.authenticateUser = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

// authMiddleware.authorizeRole = (requiredRole) => {
//   return async (req, res, next) => {
//     const { user } = req;

//     if (!user || user.role !== requiredRole) {
//       return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
//     }

//     next();
//   };
// };

// authMiddleware.authorizeRole = (...requiredRoles) => {
//   return async (req, res, next) => {
//     const { user } = req;

//     console.log(user.role);
//     if (!user || !requiredRoles.includes(user.role)) {
//       return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
//     }

//     next();
//   };
// };

authMiddleware.authorizeRole = (...requiredRoles) => {
  return async (req, res, next) => {
    const { user } = req;

    console.log(user.role);
    if (!user || !requiredRoles.some(role => user.role === role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }

    next();
  };
};

// authMiddleware.js

// ... (existing code)

authMiddleware.isTokenBlacklisted = (req, res, next) => {
  const { user } = req;
  if (user && global.blacklistedTokens && global.blacklistedTokens.includes(req.header('Authorization').replace('Bearer ', ''))) {
    return res.status(401).json({ error: 'Unauthorized: Token has been blacklisted' });
  }
  next();
};

// ... (existing code)


module.exports = authMiddleware;
