const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HttpError } = require('../utils');
const { SECRET_KEY } = process.env;

const registerService = async body => {
  const { email, password } = body;
  const currentUser = await User.findOne({ email });
  if (currentUser) {
    throw new HttpError(409, 'Email already exists');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });
  return newUser;
};

const loginService = async body => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user,
  };
};

const logoutService = async user => {
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token: '' });

  return id;
};

const updateSubscriptionService = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw new HttpError(400, 'missing field subscription');
  }
  const user = await User.findByIdAndUpdate(contactId, body);
  if (!user) {
    throw new HttpError(404, 'Not found');
  }
  return user;
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
};
