import User from "@/database/model/User";
import { NextRequest, NextResponse } from "next/server";

const res = NextResponse;
export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    if (!userData.email! || !userData.otp) {
      return res.json({
        success: false,
        message: "",
        error: "Email or otp is missing",
      });
    }

    const person = await User.findOne({ email: userData.email });

    if (person.isVerified) {
      return res.json({ success: false, message: "User already verified" });
    }

    if (person && person.emailOtp === userData.otp) {
      person.isVerified = true;
      person.otp = "";
      await person.save();
      return res.json({ success: true, message: "user verified" });
    }

    return res.json({ success: false, message: "", error: "Otp is incorrect" });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "",
      error: "Server error occured",
    });
  }
}
