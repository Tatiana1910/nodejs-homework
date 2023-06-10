const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PROJECT_URL } = process.env;
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const sendEmail = require("../decorators/sendEmail");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const crypto = require("crypto");

const registerService = async (body) => {
  const { email, password } = body;
  const currentUser = await User.findOne({ email });
  if (currentUser) {
    throw new HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  };
};

const verifyService = async (token) => {
  const currentUser = await User.findOne({ verificationToken: token });

  if (!currentUser) {
    throw new HttpError(404, "User is not found");
  }
  await User.findByIdAndUpdate(currentUser.id, {
    verify: true,
    verificationToken: "",
  });
};

const resendVerifyEmailService = async (body) => {
  const { email } = body;
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    throw new HttpError(404, "User is  not found");
  }
  if (currentUser.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: currentUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${currentUser.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);
};

const loginService = async (body) => {
  const { email, password } = body;
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, currentUser.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: currentUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(currentUser._id, { token });

  return {
    token,
    user: {
      email: currentUser.email,
      subscription: currentUser.subscription,
    },
  };
};

const logoutService = async (user) => {
  const { _id } = user;
  const currentUser = await User.findByIdAndUpdate(_id, { token: "" });
  if (!currentUser) {
    throw new HttpError(401, "Not authorized");
  }
};

const changeUserSubscriptionService = async (body, user) => {
  const { _id } = user;
  const changeUserSubscription = await User.findByIdAndUpdate(_id, body, {
    new: true,
  });
  if (!changeUserSubscription) {
    throw new HttpError(404, "Not found");
  }
  return changeUserSubscription;
};

const updateAvatarUserService = async (user, file) => {
  const { _id } = user;
  const { path: tempUpload, originalname } = file;
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
  const changeAvatarUser = await User.findByIdAndUpdate(_id, { avatarURL });
  return changeAvatarUser;
};
module.exports = {
  registerService,
  verifyService,
  resendVerifyEmailService,
  loginService,
  logoutService,
  changeUserSubscriptionService,
  updateAvatarUserService,
};
