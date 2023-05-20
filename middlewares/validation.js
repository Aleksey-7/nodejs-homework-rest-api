const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../utils/httpError');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    next();
  };
  return func;
};

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new HttpError(400, 'Invalid contact id');
  }
  next();
};

module.exports = {
  validateBody,
  validateId,
};
