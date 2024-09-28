import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";
import { Comments } from "@/lib/model/comment.model";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  try {
    const authToken: string = request.headers.get("authorization")!;
    
    const { postId, input } = await request.json();
    if (!postId || !input) {

      return NextResponse.json(success(404, "input or postId is required"));
    }

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
      const name = user.username;
      const post = await Post.findOne({ _id: postId });


      const comment = await Comments.create({
        ownername: name,
        commentowner: id,
        owner: post._id,
        content: input,
      });

      await post.comments.push(comment._id);

      await post.save();

      return NextResponse.json(success(201, comment));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(error(404, e));
  }
}
