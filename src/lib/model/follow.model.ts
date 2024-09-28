const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    Follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    Folloing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Follower =
  mongoose.models.followers || mongoose.model("followers", followerSchema);
