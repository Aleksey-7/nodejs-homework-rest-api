const express = require('express');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require('../../controllers/authControllers');
const {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
} = require('../../schemas/authSchema');

router.post('/register', validateBody(createUserValidationSchema), register);

router.post('/login', validateBody(loginValidationSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.post('/:userId', validateBody(updateSubscriptionSchema), updateSubscription);

module.exports = router;
