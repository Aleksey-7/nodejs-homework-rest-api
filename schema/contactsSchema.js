const Joi = require('joi');
const phoneJoi = Joi.extend(require('joi-phone-number'));

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: phoneJoi.string().min(7).max(13).phoneNumber().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: phoneJoi.string().min(7).max(13).phoneNumber(),
});

module.exports = {
  addSchema,
  updateSchema,
};
