const Joi = require("joi");

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "sting.pattern.base":
      "Password should contain minimum eight characters, at least one letter and one number",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.invalid": "{{#label}} contains invalide option",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

const userEmailSchema = Joi.object({
  email: createUserValidationSchema.extract("email"),
});

const UserUpdateSubscriptionSchema = Joi.object().keys({
  subscription: createUserValidationSchema.extract("subscription"),
});

module.exports = {
  createUserValidationSchema,
  loginValidationSchema,
  UserUpdateSubscriptionSchema,
  userEmailSchema,
};
