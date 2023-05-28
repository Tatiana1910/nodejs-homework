const express = require("express");

const {
  register,
  login,
  logout,
  currentUser,
  userUpdateSubscriprion,
} = require("../../controllers/usersControllers");
const validateBody = require("../../decorators/validateBody");
const {
  createUserValidationSchema,
  loginValidationSchema,
  UserUpdateSubscriptionSchema,
} = require("../../schemas/usersValidationSchemas");
const authenticate = require("../../decorators/authenticate");

const router = express.Router();
router.post("/register", validateBody(createUserValidationSchema), register);

router.post("/login", validateBody(loginValidationSchema), login);

router.get("/current", authenticate, currentUser);
router.post("/logout", authenticate, logout);
router.patch(
  "/current/subscription",
  authenticate,
  validateBody(UserUpdateSubscriptionSchema),
  userUpdateSubscriprion
);

module.exports = {
  usersRouter: router,
};
