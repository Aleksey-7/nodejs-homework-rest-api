const express = require('express');
const router = express.Router();

const { validateBody, authenticate, upload } = require('../../middlewares');
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  uploadAvatar,
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

router.patch('/avatars', authenticate, upload.single('avatar'), uploadAvatar);

module.exports = router;
