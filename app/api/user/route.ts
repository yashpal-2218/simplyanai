import connectDB from "@/database/connect-db";
import { getUser, verifyToken } from "@/utils/user-auth";
import { NextRequest, NextResponse } from "next/server";

const res = NextResponse;
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const uidParam = req.nextUrl.searchParams.get("uid");
    const uidCookie = await req.cookies.get("uid");
    const token = uidCookie?.value || uidParam;

    if (token) {
      const userObj = await verifyToken(token);

      if (userObj) {
        const user = await getUser({ _id: userObj._id });

        if (user) {
          return res.json({ success: true, user: user });
        }
      }
    }

    return res.json({ success: true, user: null });
  } catch (error) {
    console.error("Error in user/route.ts", error);
    return res.json({
      success: false,
      error: "Server error, please try again.",
    });
  }
}
