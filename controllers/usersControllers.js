const {
  registerService,
  loginService,
  logoutService,
  changeUserSubscriptionService,
} = require("../services/usersServices");
const ctrlWrapper = require("../decorators/ctrlWrapper");

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

module.exports = {
  register,
  login,
  logout,
  currentUser,
  userUpdateSubscriprion,
};
