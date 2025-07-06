// Handles requests to non-existent routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  // Set status code to 500 if it was 200, otherwise use the existing status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific check for Mongoose's CastError (e.g., bad ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    // Show stack trace only in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };