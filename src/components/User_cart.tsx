import Image from "next/image";
import Link from "next/link";
import no_image from "../../public/no-image.png";
import no_bg from "../../public/background-img.jpg";

function User_cart({ data }: any) {
  return (
    <>
      {data ? (
        <div className="w-full h-52 rounded-lg  bg-white shadow-md">
          <div className="relative w-full  h-[55%] flex flex-col items-center  rounded-lg">
            <div className="rounded-xl mt-2  w-[95%] h-20 ">
              <Image
                width={240}
                height={2}
                className="rounded-xl w-full h-full "
                src={data.profileImg.url || no_bg}
                alt="Profile Image"
              />
            </div>
            <div className="ring-2 ring-blue-500 w-14 h-14 absolute rounded-full left-auto -bottom-1  ">
              <Image
                width={56}
                height={56}
                className=" w-full h-full rounded-full"
                src={data.avatar.url || no_image}
                alt="Avatar"
              />
            </div>
          </div>
          <div className=" h-[40%] flex flex-col items-center">
            <h3 className="font-bold mt-2">
              <b>{data.username}</b>
            </h3>
            <p className="text-xs text-gray-500">
              {data.followers.length}
              followers
            </p>
            <Link
              href="http://localhost:3000/profile"
              className="w-28 flex justify-center p-1 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white "
            >
              My Profile
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default User_cart;
