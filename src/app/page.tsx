import Hero from "@/components/Hero";
import Left from "@/components/Left";
import Right from "@/components/Right";
import { Post } from "@/lib/model/post.model";
import { User } from "@/lib/model/user.model";
import { cookies } from "next/headers";
const dbConect = require("@/lib/dbConnect");
import jwt from "jsonwebtoken";
import Add_post from "@/components/Add_post";
dbConect();

const Home = async () => {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;

    const userData: any = jwt.decode(cookie);

    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (!user) {
      return <div className="text-black">this is non</div>;
    }

    const posts: any = await Post.find({ block: false }).populate("owner");
    return (
      <>
        <div className="w-full mt-14 flex justify-center">
          <div className="w-[95%] flex  justify-evenly">
            <Left type="Home" data={user} />

            {/* Main */}
            <div className="md:w-[55%] w-full flex flex-col gap-4">
              {/* <Stories /> */}
              <Add_post data={user.avatar.url} />
              {posts ? (
                posts.toReversed().map((items: any) => {
                  return <Hero key={items._id} type={""} post={items} avatar={user.avatar.url} />;
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
            <Right type="home" data={user} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log("this is the post", error);
  }
};

export default Home;
