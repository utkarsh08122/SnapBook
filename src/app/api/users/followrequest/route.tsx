import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";

import { User } from "@/lib/model/user.model";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const authToken: string = request.headers.get("authorization")!;

    if (!authToken) {
      return NextResponse.json(success(404, "Accesstoken is required"));
    }
    const token = authToken.split(" ")[1];
    try {
      const expir: any = varifierAccessToken(token);
      const { TokenExpiredError } = expir;
      ("AccessTokenexpired");
      if (expir == "AccessTokenexpired") {
        return NextResponse.json(error(401, "AccessToken is expired"));
      }
      const { id } = expir;
      dbConect();
      const userrequest = await User.findOne({ _id: id }).select("-password");
      const useraccepter = await User.findOne({ _id: userId }).select(
        "-password"
      );
      if (userrequest.following.includes(userId)) {
        const index1 = userrequest.following.indexOf(userId);
        const index2 = useraccepter.followers.indexOf(userId);
        userrequest.following.splice(index1, 1);
        useraccepter.followers.splice(index2, 1);
        await userrequest.save();
        await useraccepter.save();
        return NextResponse.json(success(200, "unfollow"));
      }

      userrequest.following.push(userId);
      useraccepter.followers.push(id);
      await userrequest.save();
      await useraccepter.save();
      return NextResponse.json(success(200, "follow"));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}

export async function GET(request: NextRequest) {
  try {
    const authToken: string = request.headers.get("authorization")!;

    if (!authToken) {
      return NextResponse.json(success(404, "Accesstoken is required"));
    }
    const token = authToken.split(" ")[1];
    try {
      const expir: any = varifierAccessToken(token);
      const { TokenExpiredError } = expir;
      ("AccessTokenexpired");
      if (expir == "AccessTokenexpired") {
        return NextResponse.json(error(401, "AccessToken is expired"));
      }
      const { id } = expir;
      dbConect();
      const user = await User.findOne({ _id: id }).select("-password");

      const data = {
        follow: user.followers,
        following: user.following,
      };

      return NextResponse.json(success(200, data));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
