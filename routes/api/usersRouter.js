const express = require("express");

const {
  register,
  verify,
  resendVerifyEmail,
  login,
  logout,
  currentUser,
  userUpdateSubscriprion,
  userUpdateAvatar,
} = require("../../controllers/usersControllers");

const validateBody = require("../../decorators/validateBody");
const {
  createUserValidationSchema,
  loginValidationSchema,
  UserUpdateSubscriptionSchema,
  userEmailSchema,
} = require("../../schemas/usersValidationSchemas");
const authenticate = require("../../decorators/authenticate");
const upload = require("../../decorators/upload");

const router = express.Router();
router.post("/register", validateBody(createUserValidationSchema), register);
router.get("/verify/:verificationToken", verify);
router.post("/verify", validateBody(userEmailSchema), resendVerifyEmail);

router.post("/login", validateBody(loginValidationSchema), login);

router.get("/current", authenticate, currentUser);
router.post("/logout", authenticate, logout);
router.patch(
  "/current/subscription",
  authenticate,
  validateBody(UserUpdateSubscriptionSchema),
  userUpdateSubscriprion
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userUpdateAvatar
);

module.exports = {
  usersRouter: router,
};
