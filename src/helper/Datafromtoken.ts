import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const dataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("RefresToken")?.value || "";
    const data = jwt.verify(token, process.env.TOKEN_PRIVET_KEY!);

    return data;
  } catch (error) {
    console.log("this is the error", error);
  }
};
