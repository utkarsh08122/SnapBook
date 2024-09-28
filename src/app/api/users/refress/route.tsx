import { NextRequest, NextResponse } from "next/server";
import { error, success } from "@/contollers/responsController";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const authToken: string = request.headers.get("authorization")!;

    if (!authToken) {
      return NextResponse.json(success(404, "Accesstoken is required"));
    }
    const token = authToken.split(" ")[1];
    try {
      const expir: any = jwt.decode(token);

      const { id } = expir;

      try {
        const respons = jwt.sign({ id: id }, process.env.TOKEN_PUBLIC_KEY!, {
          expiresIn: "15m",
        });

        return NextResponse.json(success(200, respons));
      } catch (e) {
        return NextResponse.json(error(404, e));
      }
    } catch (e) {
      return NextResponse.json(error(404, e));
    }
  } catch (e: any) {
    return NextResponse.json(error(404, e));
  }
}
