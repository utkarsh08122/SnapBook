import { error, success } from "@/contollers/responsController";
import { User } from "@/lib/model/user.model";
import { NextRequest, NextResponse } from "next/server";
const dbConect = require("@/lib/dbConnect");

export async function POST(req: NextRequest) {
  try {
    dbConect();
    const { token }: any = await req.json();
    const user = await User.findOne({
      varifytoken: token,
      varifyTokenExpiryy: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(error(400, "invalid user"));
    }
    user.isVarifide = true;
    user.varifytoken = undefined;
    user.varifyTokenExpiryy = undefined;

    await user.save();
    return NextResponse.json(success(200, "User is varifide"));
  } catch (e: any) {
    return NextResponse.json(success(200, e._message));
  }
}
