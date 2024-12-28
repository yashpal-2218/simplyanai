import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const res = NextResponse;
export async function GET(req: NextRequest) {
  try {
    console.log("cookieStore");
    const cookieStore = cookies();
    cookieStore.delete("uid");

    return res.json({ success: true, message: "Log out" });
  } catch (error) {
    console.error("Error in logging out", error);
    return res.json({ success: false, error: "Logout failed" });
  }
}
