const Joi = require('joi');
const phoneJoi = Joi.extend(require('joi-phone-number'));

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: phoneJoi.string().phoneNumber().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object()
  .keys({
    name: addSchema.extract('name').optional(),
    email: addSchema.extract('email').optional(),
    phone: addSchema.extract('phone').optional(),
  })
  .or('name', 'email', 'phone');

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};
