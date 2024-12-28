"use client";
import AuthWrapper from "@/components/cards/auth-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyEmail } from "@/services/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  if (!email) router.back();

  async function handleVerifyEmail(formData: FormData) {
    try {
      setError("");
      const res = await verifyEmail(formData);
      if (!res.success) {
        setError(res.error);
        return;
      }
      router.push("/user/login");
    } catch (error) {
      setError("Server error occured");
      console.error(error);
    }
  }
  return (
    <section className="w-screen h-screen grid place-content-center">
      <AuthWrapper>
        <form method="POST">
          <div className="my-5 space-y-5">
            <div className="space-y-3">
              <label htmlFor="email-verify-otp" className="">
                Enter OTP
              </label>
              <Input type="number" name="otp" />
            </div>
            <div className="space-y-3" hidden>
              <Input type="email" name="email" hidden value={email!} readOnly />
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              formAction={handleVerifyEmail}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </AuthWrapper>
    </section>
  );
}
