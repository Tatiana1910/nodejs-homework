const express = require("express");

const { register, login } = require("../../controllers/usersControllers");
const validateBody = require("../../decorators/validateBody");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../../schemas/usersValidationSchemas");

const router = express.Router();
router.post("/register", validateBody(createUserValidationSchema), register);

router.post("/login", validateBody(loginValidationSchema), login);
router.post("/logout");

module.exports = {
  usersRouter: router,
};
