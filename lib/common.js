export function sendError(error, res) {
  // Log the error to the terminal
  console.error(error);

  // ValidationError (422 UNPROCESSABLE ENTITY)
  if (error.name === 'ValidationError') {
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return res.status(422).json({ errors });
  }

  // CastError (400 BAD REQUEST)
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // NotFound (404 NOT FOUND)
  if (error.name === 'DocumentNotFoundError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Duplicate Key (409 CONFLICT)
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const { field, value } = Object.entries(error.keyValue)[0];
    return res.status(409).json({ message: `Duplicate value for ${field}: ${value}` });
  }

  // Unauthorized (401 UNAUTHORIZED)
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Generic Error response if no other errors match
  return res.status(500).json({ message: 'Internal Server Error' });
}

export const sendUnauthorized = (res) => {
  return res.status(401).json({ message: 'Unauthorized' });
};