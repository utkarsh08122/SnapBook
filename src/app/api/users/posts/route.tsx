import { NextRequest, NextResponse } from "next/server";

import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";
import { Comments } from "@/lib/model/comment.model";
import { v2 as cloudinary } from "cloudinary";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  try {
    const authToken: string = request.headers.get("authorization")!;
    const { data, image } = await request.json();

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
      if (image) {
        const cloudImg = await cloudinary.uploader.upload(image);
        const post = await Post.create({
          owner: id,
          caption: data,
          image: {
            publicId: cloudImg.public_id,
            url: cloudImg.url,
          },
        });
        await user.posts.push(post._id);

        await user.save();

        return NextResponse.json(success(201, "Post is created"));
      }

      const post = await Post.create({
        owner: id,
        caption: data,
      });

      await user.posts.push(post._id);

      await user.save();

      return NextResponse.json(success(201, "Post is created"));
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

      const postData = await Post.find({ owner: user._id });

      return NextResponse.json(success(201, postData));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { postId } = await request.json();
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
      if (user) {
        const index = user.posts.indexOf(postId);
        user.posts.splice(index, 1);
        await user.save();
        await Post.deleteOne({ _id: postId });
        await Comments.deleteMany({ owner: postId });
        return NextResponse.json(success(201, "Post is delete"));
      }
      return NextResponse.json(success(201, "post is not delet"));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
