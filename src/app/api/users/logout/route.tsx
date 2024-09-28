import { error, success } from "@/contollers/responsController";
import { NextResponse } from "next/server";

const dbConect = require("@/lib/dbConnect");

export async function GET(request:NextResponse) {
  try {
    dbConect();
    const response = NextResponse.json(success(200, "logout success"));
    response.cookies.delete("RefresToken");
    return response;
  } catch (e: any) {
    return NextResponse.json(error(409, e._message));
  }
}
