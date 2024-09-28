import Hero from "@/components/Hero";
import Left from "@/components/Left";
import Profilecard from "@/components/Profilecard";
import Right from "@/components/Right";
import { Truculenta } from "next/font/google";
import { cookies } from "next/headers";
const dbConect = require("@/lib/dbConnect");
import jwt from "jsonwebtoken";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";
dbConect();

async function profile() {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    console.log("cookie", cookie);

    const userData: any = jwt.decode(cookie);

    const user: any = await User.findOne({ _id: userData.id }).select("-password");
    console.log("this is the user id", user);

    if (!user) {
      console.log("this si the user");
      return <div className="text-black">this is non</div>;
    }

    const posts: any = await Post.find({ owner: userData.id }).populate(
      "owner"
    );
    return (
      <>
        {user && (
          <div className="w-full mt-14 flex justify-center">
            <div className="w-[95%] flex  justify-evenly">
              <Left type="Profile" />
              {/* Main */}
              <div className="md:w-[55%] w-full flex flex-col gap-4">
                {user && (
                  <Profilecard key={user._id} type={"profile"} user={user} />
                )}
                {posts ? (
                  posts.map((items: any) => {
                    return (
                      <Hero
                      key={items._id}
                      type={"profile"}
                      post={items}
                    />
                    );
                  })
                ) : (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>

              <Right type="profile"/>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log("this is te post error", error);
  }
}

export default profile;
