const Joi = require('joi');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'Password should contain at least 8 characters one letter and one number',
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract('email'),
  password: createUserValidationSchema.extract('password'),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid('starter', 'pro', 'business').required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
};
