import Image from "next/image";
import { IoIosShareAlt } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { Comments } from "@/lib/model/comment.model";
import UserComments from "@/components/UserComments";
import LikeButton from "./LinkButton";
import Comment from "./Comment";
import no_image from "../../public/no-image.png";

async function Hero({
  type,
  post,
  avatar,
}: {
  type: any;
  post: any;
  avatar?: any;
}) {
  const comments = await Comments.find({ owner: post._id }).populate(
    "commentowner"
  );
  let postId = post._id.toString()

 
  return (
    <>
      {post && (
        <div className="w-full bg-white p-3 rounded-lg shadow-md">
          <div className="px-2 flex flex-col justify-between w-full text-xs  mb-1">
            {/* post user logo */}
            <div className=" flex justify-between  ">
              <div className="flex items-center gap-2">
                <Image
                  width={32}
                  height={32}
                  className=" w-8 h-8 rounded-full"
                  src={post.owner.avatar.url || no_image}
                  alt="sdvnwjdv"
                />

                <div>
                  <p className="font-bold text-xs">{post.owner.username}</p>
                  {/* <span className="text-gray-500 text-xs">{users.post} day ago</span> */}
                </div>
              </div>
              {type === "profile" ? (
                <button
                  className="text-lg font-bold "
                  // onClick={() => {
                  //   deletepost(item._id);
                  // }}
                >
                  <RiDeleteBin6Line className="text-red-600" />
                </button>
              ) : (
                ""
              )}
            </div>

            {/* post photo */}
            <div className="flex flex-col items-center gap-3 mt-2 ">
              <span className="px-3 font-medium text-pretty text-gray-500">
                {post.caption}
              </span>
              {post.image && (
                <Image
                  width={640}
                  height={40}
                  className=" w-[640px] h-72 rounded-lg "
                  src={post.image.url}
                  alt="sdvnwjdv"
                />
              )}
              {/* Lick Comente(Count) & Share */}
              <div className="text-gray-500 flex justify-between  w-full px-3 font-medium text-sm">
                <div className="flex gap-4">
                  <span
                    // onClick={() => {
                    //   likeorUnlike(item._id);
                    // }}
                    className="cursor-pointer text-blue-400 flex gap-1 items-center"
                  >
                    <BiLike />

                    <LikeButton
                      count={post.likes.length || "0"}
                      postId={postId}
                    />
                  </span>
                  <span className="flex gap-1 items-center">
                    <FaRegComment /> Comments({post.comments.length || "0"})
                  </span>
                </div>
                <div className="flex items-center">
                  <IoIosShareAlt />
                  Share
                </div>
              </div>
              {/* Comentes */}
              <Comment postId={postId} avatar={avatar} />
              {comments.length > 0
                ? comments.toReversed().map((data: any) => {
                    return <UserComments key={data._id} data={data} />;
                  })
                : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
