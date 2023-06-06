const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const globalErrorHandler = require('./globalErrorHandler');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  globalErrorHandler,
  authenticate,
  upload,
};
