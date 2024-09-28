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
      const user = await User.findOne({ _id: id }).select("-password");

      if (user.following.includes(userId)) {
        return NextResponse.json(success(200, "user exist"));
      }
      return NextResponse.json(success(200, "user not exist"));
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
