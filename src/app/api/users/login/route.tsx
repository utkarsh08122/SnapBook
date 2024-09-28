import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  generetAccessToken,
  generetRefressToken,
} from "@/contollers/Token-ganaretor";
import { error, success } from "@/contollers/responsController";
import { KEY_ACCESS_TOKEN, setItem } from "@/helper/localStroageManager";
import { User } from "@/lib/model/user.model";
const dbConect = require("@/lib/dbConnect");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(error(406, "All field are required"));
    } else {
      dbConect();
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(error(404, "User is not exist"));
      }
      // thia is use to check the password id correcr or not
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return NextResponse.json(error(406, "Password is wrong"));
      }

      // in tokenData thosedata are store which is incoded in access token and refress token
      const tokenData = {
        id: user._id,
      };
      const RefresToken = generetRefressToken(tokenData);
      const AccessToken = generetAccessToken(tokenData);
      const response = NextResponse.json(success(200, AccessToken));
      response.cookies.set("RefresToken", RefresToken, {
        httpOnly: true,
        secure: true,
      });

      return response;
    }
  } catch (e: any) {
    return NextResponse.json(error(400, e._message));
  }
}
