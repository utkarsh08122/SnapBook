"use client";

import { Commentinput } from "@/helper/Action";
import Image from "next/image";
import { useState } from "react";
import AddpostButton from "./AddpostButton";
import no_image from "../../public/no-image.png";

function Comment({ postId, avatar }: any) {
  const [comment, setComment] = useState<any>("");
  console.log("this is avataataa",avatar)
  return (
    <div className=" gap-4  flex justify-between w-full px-3 font-medium text-sm">
      <span className="flex items-center">
        <Image
          width={32}
          height={32}
          className=" w-8 h-8 rounded-full"
          src={avatar || no_image}
          alt=""
        />
      </span>
      <form
        action={(formData) => {
          Commentinput(comment, postId);
          setComment("");
        }}
        className="flex-1 flex "
      >
        <input
          className="outline-none bg-slate-400/20 text-slate-800/80 w-full h-full p-3 rounded-lg"
          type="text"
          name="commnet"
          value={comment}
          placeholder="Add a comment..."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <AddpostButton />
      </form>
    </div>
  );
}

export default Comment;
