import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WEB_URL = process.env.WEBSITE_URL;

const url =
  process.env.NODE_ENV === "production" ? WEB_URL : "http://localhost:3000";

const redirectUrl = url + "/user/login";

export async function middleware(req: NextRequest) {
  const uidToken = req.cookies.get("uid");
  const { pathname } = req.nextUrl;

  // if user is logged in and try to access publicRoutes
  if (uidToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(url!);
  }

  // if(!uidToken && pathname === "/api/user/logout"){
  //   return NextResponse.redirect(url!);
  // }

  // if user is not logged in and try to access protectedRoutes
  if (!uidToken && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  mathcer: [
    "/",
    "/tool",

    "/user/signup",
    "/user/login",
    "/user/logout",
    "/user/verify-email",

    "/api/buggy",
    "/api/chatwithdoc",

    "/api/user/signup",
    "/api/user/login",
    "/api/user/logout",
    "/api/user/verify-email",
  ],
};

const protectedRoutes = [
  "/tool/chatwithdoc",
  "/tool/buggy",

  "/api/buggy",
  "/api/chatwithdoc",

  "/api/user/signup",
  "/api/user/login",
  "/api/user/logout",
  "/api/user/verify-email",
];

const publicRoutes = [
  "/user/signup",
  "/user/login",
  "/user/verify-email",

  "/api/user/signup",
  "/api/user/login",
  "/api/user/verify-email",
];
