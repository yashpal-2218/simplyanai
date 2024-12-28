"use server";
import User from "@/database/model/User";

export async function verifyEmail(formData: FormData) {
  const strOtp = formData.get("otp");
  const email = formData.get("email");

  if (!email || !strOtp) {
    return { success: false, error: "Email or otp is missing" };
  }
  const user = await User.findOne({ email: email, isVerified: false });

  if (!user) {
    // email does not exist
    return { success: false, error: "User does not exist" };
  }

  if (user.emailOtp.toString() !== strOtp) {
    //   return opt invalid
    return { success: false, error: "Otp is invalid" };
  }

  user.isVerified = true;
  await user.save();
  return { success: true, error: "" };
}
