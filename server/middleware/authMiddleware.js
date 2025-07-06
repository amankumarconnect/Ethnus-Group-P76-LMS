import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Protect routes by verifying token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer ...token...")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object, excluding the password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

// Middleware to check for 'instructor' role
const instructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        next();
    } else {
        res.status(403); // 403 Forbidden
        throw new Error('Not authorized as an instructor');
    }
};

export { protect, instructor };