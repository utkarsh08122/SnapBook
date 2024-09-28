import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      publicId: String,
      url: String,
    },
    profileImg: {
      publicId: String,
      url: String,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    isVarifide: {
      type: Boolean,
      default: false,
    },
    varifytoken: String,
    varifyTokenExpiryy: Date,
    followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
