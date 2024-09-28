import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    block: {
      required: true,
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);
export const Post =
  mongoose.models.posts || mongoose.model("posts", postSchema);
