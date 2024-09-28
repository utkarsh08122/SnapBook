const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    ownername: {
      required: true,
      type: String,
    },
    commentowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Comments =
  mongoose.models.comments || mongoose.model("comments", commentSchema);
