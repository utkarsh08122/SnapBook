import Link from "next/link";

function Search({ userData }: any) {
  console.log("this is userdata", userData);

  return (
    <div className=" flex w-full justify-center">
      <div className="border-b-2 w-[95%] ">
        <Link href={`http://localhost:3000/user/${userData._id}`}>
          {userData.username}
        </Link>
      </div>
    </div>
  );
}

export default Search;
