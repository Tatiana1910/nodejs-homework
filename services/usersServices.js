const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const registerService = async (body) => {
  const fetchedUsers = await User.findOne({ email: body.email });
  if (fetchedUsers) {
    throw new HttpError(409, "Email in use");
  }
  return await User.create(body);
};

// const registerService = async (body) => {
//   const { email, password } = body;
//   const fetchedUsers = await User.findOne({
//     email,
//     password,
//   });
//   if (fetchedUsers) {
//     throw new HttpError(409, "Email in use");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   return await User.create({ ...body, password: hashPassword });
// };

const loginService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  return token;
};

const logoutService = () => {};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
