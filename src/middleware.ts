import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const RefresToken = request.cookies.get("RefresToken")?.value || "";
  const jwtConfig = {
    secret: new TextEncoder().encode(process.env.TOKEN_PRIVET_KEY),
  };

  const path = request.nextUrl.pathname;
  const url = request.url
console.log("in the middilware",url)
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/varifytoken";

  if (isPublicPath && RefresToken) {
    try {
      const decoded: any = await jose.jwtVerify(RefresToken, jwtConfig.secret);
      if (decoded.payload?.exp * 1000 > Date.now()) {
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        const respons = NextResponse.redirect(new URL("/login", request.url));
        respons.cookies.delete("RefresToken");
        return respons;
      }
    } catch (e) {
      const respons = NextResponse.redirect(new URL("/login", request.url));
      respons.cookies.delete("RefresToken");
      return respons;
    }
  }

  if (!isPublicPath) {
    if (!RefresToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const decoded: any = await jose.jwtVerify(RefresToken, jwtConfig.secret);

      if (decoded.payload?.exp * 1000 > Date.now()) {
        return NextResponse.next();
      } else {
        const respons = NextResponse.redirect(new URL("/login", request.url));
        respons.cookies.delete("RefresToken");
        return respons;
      }
    } catch (e) {
      const respons = NextResponse.redirect(new URL("/login", request.url));
      respons.cookies.delete("RefresToken");
      return respons;
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/varifytoken/:path*",
    "/logout",
    "/user/:path*",
  ],
};
