const {
  registerService,
  verifyService,
  resendVerifyEmailService,
  loginService,
  logoutService,
  changeUserSubscriptionService,
  updateAvatarUserService,
} = require("../services/usersServices");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const register = ctrlWrapper(async (req, res, next) => {
  const newUser = await registerService(req.body);
  res.status(201).json(newUser);
});

const verify = ctrlWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;
  await verifyService(verificationToken);
  res.status(200).json({ message: "Verification successful" });
});

const resendVerifyEmail = ctrlWrapper(async (req, res) => {
  await resendVerifyEmailService(req.body);
  res.status(200).json({ message: "Verification email is sent" });
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

const userUpdateAvatar = ctrlWrapper(async (req, res, next) => {
  const changedAvatarUser = await updateAvatarUserService(req.user, req.file);
  res.status(200).json(changedAvatarUser);
});

module.exports = {
  register,
  verify,
  resendVerifyEmail,
  login,
  logout,
  currentUser,
  userUpdateSubscriprion,
  userUpdateAvatar,
};
