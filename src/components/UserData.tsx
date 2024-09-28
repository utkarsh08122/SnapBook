import Image from "next/image";
import Link from "next/link";

function UserData() {
  return (
    <div className="w-full rounded-lg  bg-white shadow-md">
      <div className=" w-full    flex flex-col rounded-lg  px-8">
        <Link href=" " className=" flex py-3  text-gray-500 ">
          My Post
        </Link>
        <Link href=" " className=" flex py-3 text-gray-500 ">
          My Albums
        </Link>
        <Link href=" " className=" flex  py-3 text-gray-500 ">
          My Videos
        </Link>
        <Link href=" " className=" flex  py-3 text-gray-500 ">
          My Settings
        </Link>
        <Link href=" " className=" flex  py-3 text-gray-500 ">
          My Profile
        </Link>
      </div>
    </div>
  );
}

export default UserData;
