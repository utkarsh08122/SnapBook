"use client";
import { useEffect, useState } from "react";
import { FollowRequest } from "@/helper/Action";

function UserInfoCard({ type, userinfo, follow }: any) {
  const [isFollowing, setIsFollowing] = useState<boolean>();

  const followReauest = async () => {
    const result: any = await FollowRequest(userinfo.id);
    console.log(result);
    {
      result == true ? setIsFollowing(true) : setIsFollowing(false);
    }
  };

  useEffect(() => {
    setIsFollowing(follow);
  });

  return (
    <div className="bg-white rounded-lg">
      <div className="w-full p-2 flex flex-col gap-2">
        <span>{userinfo.name}</span>
        <p className=" text-[10px] font-medium text-pretty text-slate-800/80">
          {userinfo.bio}
        </p>
        <span className=" text-[10px] text-slate-800/80">
          Living in{" "}
          <span className="text-slate-800  text-pretty">
            <b>Varanasi</b>
          </span>
        </span>
        {type == "user" && (
          <div className="w-full flex flex-col gap-2  ">
            <button
              onClick={() => {
                followReauest();
              }}
              className=" cursor-pointer flex justify-center p-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white "
            >
              {isFollowing ? <> unfollow</> : <> Follow</>}
            </button>
            <button className="cursor-pointer text-xs flex justify-end p-1 active:text-red-700 text-red-500 ">
              Block User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfoCard;
