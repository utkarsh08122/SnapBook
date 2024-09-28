"use client";

import { LikeCount } from "@/helper/Action";

const LikeButton = ({ count,postId }: any) => {
  return (
    <button
      onClick={() => {
        LikeCount(postId);
      }}
    >
      Like({count})
    </button>
  );
};

export default LikeButton;
