import { NextRequest, NextResponse } from "next/server";

import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";
import { v2 as cloudinary } from "cloudinary";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  try {
    const authToken: string = request.headers.get("authorization")!;
    const { userImg, ProfileImg, name, bio } = await request.json();

    if (!authToken) {
      return NextResponse.json(success(404, "Accesstoken is required"));
    }
    const token = authToken.split(" ")[1];
    try {
      const expir: any = varifierAccessToken(token);
      if (expir == "AccessTokenexpired") {
        return NextResponse.json(error(401, "AccessToken is expired"));
      }
      const { id } = expir;
      dbConect();
      const user = await User.findOne({ _id: id }).select("-password");
      if (userImg) {
        const cloudImg = await cloudinary.uploader.upload(userImg);
        user.avatar = {
          publicId: cloudImg.public_id,
          url: cloudImg.url,
        };
      }

      if (ProfileImg) {
        const cloudImg = await cloudinary.uploader.upload(ProfileImg);
        user.profileImg = {
          publicId: cloudImg.public_id,
          url: cloudImg.url,
        };
      }
      if (name) {
        user.username = name;
      }

      if (bio) {
        user.bio = bio;
      }
      const newUser = await user.save();

      return NextResponse.json(success(201, newUser));
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
      if (expir == "AccessTokenexpired") {
        return NextResponse.json(error(401, "AccessToken is expired"));
      }
      const { id } = expir;
      dbConect();
      const user = await User.findOne({ _id: id }).select("-password");
      return NextResponse.json(success(201, user));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
