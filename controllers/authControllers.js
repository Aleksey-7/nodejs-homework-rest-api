const { controllerWrapper } = require('../utils');
const {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
} = require('../services/authServices');

const register = controllerWrapper(async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: 'starter',
    },
  });
});

const login = controllerWrapper(async (req, res) => {
  const result = await loginService(req.body);
  res.status(200).json({
    token: result.token,
    user: {
      email: req.body.email,
      subscription: result.user.subscription,
    },
  });
});

const getCurrent = controllerWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
});

const logout = controllerWrapper(async (req, res) => {
  await logoutService(req.user);

  res.status(204).end();
});

const updateSubscription = controllerWrapper(async (req, res) => {
  const { userId } = req.params;
  await updateSubscriptionService(userId, req.body);

  res.status(200).json({ message: 'subscription updated' });
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
