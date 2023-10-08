const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = (req, res, next) => {
  // Verify access token and add user data to request object
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const secretKey = 'test_secret_key';

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Token invalid' });
    }

    // If the token is valid, you can add the decoded user data to the request object
    req.user = decoded;
    next();
  });
};
  
exports.authorizeRole = (role) => {
  return async(req, res, next) => {
    const userId = req.user.userId;
    const userProfile = await User.findById(userId);
    const userRole = userProfile.role;

    // Check if the user's role matches the required role
    if (userRole !== role) {
      return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
    }

    next();
  };
};
