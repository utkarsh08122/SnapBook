import { User } from "@/lib/model/user.model";
import Image from "next/image";
import no_image from "../../public/no-image.png";

async function FollowerCart({ userId }: any) {
  console.log("this si the userId",userId)
  const followers = await User.findOne({ _id: userId });

  return (
    <div className="px-2 flex justify-between w-full text-xs  mb-1">
      <div className=" flex items-center gap-2  ">
        <Image
          width={40}
          height={40}
          className=" w-10 h-10 rounded-full"
          src={followers.avatar.url || no_image}
          alt="sdvnwjdv"
        />
        <p className="font-bold  truncate">{followers.username}</p>
      </div>

      <div className="flex items-center  gap-2 "></div>
    </div>
  );
}

export default FollowerCart;
