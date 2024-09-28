import Image from "next/image";
import no_image from "../../public/no-image.png";
import no_bg from "../../public/background-img.jpg";

function Profilecard({ type, user }: { type: any; user: any }) {

  return (
    <>
      {user ? (
        <div className="w-full px-3 ">
          <div className="px-2 flex flex-col justify-between w-full text-xs  mb-1">
            <div className="relative w-full  flex flex-col items-center  rounded-lg">
              <Image
                width={664}
                height={200}
                className=" mt-2  w-[664px] h-[200px] "
                src={user.profileImg.url || no_bg}
                alt="sdvnwjdv"
              />

              <Image
                width={112}
                height={112}
                className="w-28 h-28 absolute rounded-full left-auto -bottom-14 ring-4 ring-white "
                src={user.avatar.url || no_image}
                alt="sdvnwjdv"
              />
            </div>
          </div>
          <div className="w-full text-lg mt-16 font-bold  flex justify-center">
            {user.username}
          </div>
          <div className="flex gap-6 py-3 flex-1 justify-evenly">
            <span className="flex flex-col items-center">
              <span className="font-bold">
                {user.posts ? user.posts.length : "0"}
              </span>
              <span>Posts</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold">
                {user.followers ? user.followers.length : "0"}
              </span>
              <span>Followers</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold">
                {user.following ? user.following.length : "0"}
              </span>
              <span>Following</span>
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Profilecard;
