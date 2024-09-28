import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import { varifierAccessToken } from "@/contollers/Token-ganaretor";
import { User } from "@/lib/model/user.model";
import { Post } from "@/lib/model/post.model";

const dbConect = require("@/lib/dbConnect");

export async function POST(request: NextRequest) {
  const {userId} = await request.json();
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
    

      const postData = await Post.find({ owner: userId });
      return NextResponse.json(success(201, postData));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
