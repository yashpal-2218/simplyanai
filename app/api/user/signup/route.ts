import User from "@/database/model/User";
import connectDB from "@/database/connect-db";
import { NextRequest, NextResponse } from "next/server";
import { createPasswordHash } from "@/utils/user-auth";
import { sendMail } from "@/services/send-mail";
import { emailOtpHtmlTemplate } from "@/utils/mail-template";

const otpGenerator = require("otp-generator");

const res = NextResponse;
export async function POST(req: NextRequest) {
  try {
    // If content-length is 0, the body is empty
    const contentLength = req.headers.get("content-length");
    if (!contentLength || contentLength === "0") {
      return NextResponse.json(
        { success: false, error: "No data sent in request body" },
        { status: 400 }
      );
    }

    const formData = await req.json();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password1 ||
      !formData.password2
    ) {
      return res.json({
        success: false,
        error: "Some data is missing",
      });
    }

    await connectDB();

    const user = await User.exists({ email: formData.email });
    if (user) {
      return NextResponse.json({
        success: false,
        error: "User with this email already exists",
      });
    }

    if (formData.password1 !== formData.password2) {
      return res.json({
        success: false,
        error: "Password does not match",
      });
    }

    let hashedPassword = await createPasswordHash(formData.password1);

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // send email

    const newUser = new User({
      name: formData.name,
      email: formData.email,
      emailOtp: otp,
      isVerified: false,
      password: hashedPassword,
      created_at: new Date(),
    });

    const msg = {
      to: newUser.email, // Change to your recipient
      from: "help.essence@gmail.com", // Change to your verified sender
      subject: "Simplyanai: Email verificaiton mail",
      // text: "",
      html: emailOtpHtmlTemplate(newUser.name, newUser.emailOtp),
    };
    await sendMail(msg);

    await newUser.save();

    return res.json({ success: true, message: "User created" });
  } catch (error) {
    console.error("error", error);
    return res.json({
      success: false,
      error: "Server failed, please try again",
    });
  }
}
