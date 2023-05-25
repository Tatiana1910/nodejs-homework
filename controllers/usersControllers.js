const {
  registerService,
  loginService,
  //   logoutService,
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

const logout = ctrlWrapper(async (req, res, next) => {});

module.exports = {
  register,
  login,
  logout,
};
