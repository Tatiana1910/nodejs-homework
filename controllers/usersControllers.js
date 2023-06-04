const {
  registerService,
  loginService,
  logoutService,
  changeUserSubscriptionService,
} = require("../services/usersServices");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const register = ctrlWrapper(async (req, res, next) => {
  const newUser = await registerService(req.body);
  res.status(201).json(newUser);
});

const login = ctrlWrapper(async (req, res, next) => {
  const loggedUser = await loginService(req.body);
  res.status(200).json(loggedUser);
});

const currentUser = ctrlWrapper(async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
});

const logout = ctrlWrapper(async (req, res, next) => {
  await logoutService(req.user);
  res.status(200).json({ message: "No Content " });
});

const userUpdateSubscriprion = ctrlWrapper(async (req, res, next) => {
  const changedUserSubscription = await changeUserSubscriptionService(
    req.body,
    req.user
  );
  res.status(200).json(changedUserSubscription);
});

const updateAvatar = ctrlWrapper(async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  const avatarURL = path.join("avatars", filename);

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.cover(250, 250).write(tempUpload);
    })
    .catch((err) => {
      throw err;
    });

  await fs.rename(tempUpload, resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
});

module.exports = {
  register,
  login,
  logout,
  currentUser,
  userUpdateSubscriprion,
  updateAvatar,
};
