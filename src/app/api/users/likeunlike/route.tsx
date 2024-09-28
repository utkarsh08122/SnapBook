import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";
import { Post } from "@/lib/model/post.model";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  try {
    dbConect();
    const postId = await request.json();

    if (!postId) {
      return NextResponse.json(success(404, "postId is required"));
    }

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
      const currentUserId = expir.id;

      const post = await Post.findOne({ _id: postId });

      try {
        if (post.likes.includes(currentUserId)) {
          const index = post.likes.indexOf(currentUserId);

          post.likes.splice(index, 1);
          await post.save();
          return NextResponse.json(success(200, post.likes.length));
        } else {

          post.likes.push(currentUserId);
          await post.save();

          return NextResponse.json(success(200, post.likes.length));
        }
      } catch (e) {
        return NextResponse.json(error(500, e));
      }
    } catch (e) {
      return NextResponse.json(error(403, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
export async function GET(request: NextRequest) {
  try {
    dbConect();
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(success(404, "postId is required"));
    }

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
      const currentUserId = expir.id;
      const post = await Post.findOne({ _id: postId }).populate("likes");
      try {
        if (post.likes.includes(currentUserId)) {
          const index = post.likes.indexOf(currentUserId);

          post.likes.splice(index, 1);
          await post.save();
          return NextResponse.json(success(200, "Post Unlike"));
        } else {
          post.likes.push(currentUserId);
          await post.save();
          return NextResponse.json(success(200, "Post Like"));
        }
      } catch (e) {
        return NextResponse.json(error(500, e));
      }
    } catch (e) {
      return NextResponse.json(error(403, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
