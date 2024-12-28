import connectDB from "@/database/connect-db";
import User from "@/database/model/User";
import { createPasswordHash, createToken, getUser } from "@/utils/user-auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// @ts-ignore
import bcrypt from "bcryptjs";

const res = NextResponse;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    // Check if the request body is empty
    const contentLength = req.headers.get("content-length");

    // If content-length is 0, the body is empty
    if (!contentLength || contentLength === "0") {
      return NextResponse.json(
        { success: false, error: "No data sent in request body" },
        { status: 400 }
      );
    }

    const formData = await req.json();

    if (!formData.email || !formData.password) {
      return res.json({
        success: false,
        error: "Email or password is missing",
      });
    }

    await connectDB();

    const user = await User.findOne({
      email: formData.email,
      isVerified: true,
    });

    if (!user) {
      return res.json({
        success: false,
        error: "Email does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      formData.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // user is valid set cookie
    const token = await createToken({
      _id: user._id,
      name: user.name,
    });
    cookieStore.set("uid", token);

    // Respond with success if no issues
    return res.json({ success: true, user, message: "Login successful" });
  } catch (error) {
    // console.error("Error parsing JSON:", error);
    // Handle other errors like invalid JSON format
    return res.json({ success: false, error: "Failed to parse JSON" });
  }
}
