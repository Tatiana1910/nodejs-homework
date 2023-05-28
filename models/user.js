const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils/HandleMongooseError");

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },

  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMongooseError);

const User = model("user", usersSchema);

module.exports = {
  User,
};
