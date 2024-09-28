"use client";
import Image from "next/image";
import { useState } from "react";
import AddpostButton from "./AddpostButton";
import { addUserPost } from "@/helper/Action";
import no_image from "../../public/no-image.png";

function Add_post({ data }: any) {
  const [desc, setdesc] = useState<string>("");
  const [postImg, setPostImg] = useState<any>("");

  const handelImagechange = (e: any) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setPostImg(filereader.result);
      }
    };
  };

  return (
    <>
      <div className="w-full p-3 bg-white rounded-lg shadow-md ">
        {postImg && (
          <Image
            src={postImg}
            alt="this is imsge"
            width={640}
            height={40}
            className=" w-[640px] h-72 rounded-lg mb-2"
          />
        )}
        <div>
          <form
            className="flex w-full items-end gap-2"
            action={(formData) => {
              addUserPost(formData, postImg);
              setdesc("");
              setPostImg("");
            }}
          >
            <Image
              src={data || no_image}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />

            <textarea
              name="desc"
              id="desc"
              value={desc}
              placeholder="What is on your mind?"
              className="pt-2 pl-2 flex-1 border rounded-lg text-sm resize-none border-black bg-slate-200/10 "
              onChange={(e: any) => {
                setdesc(e.target.value);
              }}
            ></textarea>
            <AddpostButton />
          </form>
        </div>

        <div className=" pl-14 flex gap-3 mt-2 text-gray-500 text-sm">
          <input
            type="file"
            placeholder="image"
            accept="image/*"
            onChange={handelImagechange}
          />
        </div>
      </div>
    </>
  );
}

export default Add_post;
