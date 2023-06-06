const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
require('dotenv').config();

const User = require('../models/user');
const { HttpError } = require('../utils');

const avatarDir = path.join(__dirname, '../', 'public', 'avatars');
const { SECRET_KEY } = process.env;

const registerService = async body => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email already exists');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = await gravatar.url(email);

  const newUser = await User.create({ ...body, password: hashPassword, avatarURL });
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
  const user = await User.findByIdAndUpdate(contactId, body);
  if (!user) {
    throw new HttpError(404, 'Not found');
  }
  return user;
};

const uploadAvatarService = async body => {
  const { _id: id } = body.user;
  const { path: tempUpload, originalname } = body.file;
  const filename = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  await fs.rename(tempUpload, resultUpload);

  (async function resize() {
    const image = await Jimp.read(resultUpload);
    image.resize(250, 250);
    await image.writeAsync(resultUpload);
  })();

  const avatarURL = path.join('avatars', filename);

  await User.findByIdAndUpdate(id, { avatarURL });

  return avatarURL;
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
  uploadAvatarService,
};
