import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import { User } from "@/lib/model/user.model";
const dbConect = require("@/lib/dbConnect");

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(error(406, "input is require"));
    } else {
      dbConect();
      
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json(error(404, "User is not exist"));
      }
      
      return NextResponse.json(success(200, user));
    }
  } catch (e: any) {
    return NextResponse.json(error(400, e._message));
  }
}
