import UserInfoCard from "./UserInfoCard";
import { User } from "@/lib/model/user.model";
import { cookies } from "next/headers";
const dbConect = require("@/lib/dbConnect");
import jwt from "jsonwebtoken";
import FollowerCart from "./FollowerCart";
import FollowCard from "./FollowCard";
dbConect();

type userdata = {
  id: String;
  name: String;
  bio: String;
};

async function Right({ type, data }: { type: string; data?: any }) {
  try {
    const cookieStore: any = cookies();
    const cookie = cookieStore.get("RefresToken").value;
    const userData: any = jwt.decode(cookie);
    const user: any = await User.findOne({ _id: userData.id }).select(
      "-password"
    );
    if (!user) return;
    let follow = false;
    if (user.following.includes(data._id)) {
      follow = true;
    }
    const userinfo: userdata = {
      id: data.id,
      name: data.username,
      bio: data.bio,
    };

    return (
      <>
        {user && (
          <div className="hidden  w-[20%] md:flex flex-col gap-5  ">
            {type ? (
              <>
                <UserInfoCard
                  key={user._id}
                  type={type}
                  userinfo={userinfo}
                  follow={follow}
                />
              </>
            ) : null}
            {/* followers */}
            <div className="w-full bg-white rounded-lg  overflow-auto shadow-md ">
              <p className="px-3 pt-4 w-full text-xs text-slate-500  mb-2">
                Followers
              </p>

              {/* Friend Request Card */}

              {data.followers != null
                ? data.followers.map((request: any) => {
                    return <FollowerCart userId={request} />;
                  })
                : ""}
            </div>
            <div className="w-full bg-white rounded-lg  overflow-auto shadow-md ">
              <p className="px-3 pt-4 w-full text-xs text-slate-500  mb-2">
                Following
              </p>

              {/* Friend Request Card */}

              {data.following != null
                ? data.following.map((request: any) => {
                    return <FollowCard userId={request} />;
                  })
                : ""}
            </div>

            {/* add AD for money */}
          </div>
        )}
      </>
    );
  } catch (error) {}
}

export default Right;
