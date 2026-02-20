import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import process from "process";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    authorizationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id };

  return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };

  return jwt.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const User = model("User", userSchema);

export { User };
