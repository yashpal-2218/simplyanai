"use client";
import AuthWrapper from "@/components/cards/auth-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/user";
import { useAppDispatch } from "@/lib/store";
import { setAuthState } from "@/lib/auth-slice";

export default function Page() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      setError("");

      const res = await loginUser(formData);
      if (res.data.success) {
        dispatch(setAuthState(res.data.user));
        console.log(res);

        router.push("/");
        return;
      }
      setError(res.data.error);
    } catch (error) {
      setError("Server error occured");
      console.error(error);
    }
  }

  return (
    <section className="w-screen h-screen grid place-items-center">
      <AuthWrapper>
        <form onSubmit={handleSubmit}>
          {fields.map((field, idx) => {
            return (
              <div className="my-5 space-y-1" key={idx}>
                <Input {...field} onChange={handleInputChange} />
              </div>
            );
          })}

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-5">
            <Button type="submit" className="w-full text-center text-lg">
              Login
            </Button>
          </div>
          <CardFooter className="mt-2">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href={"/user/signup"}
                className="text-secondary-foreground font-bold"
              >
                Signup
              </Link>
            </p>
          </CardFooter>
        </form>
      </AuthWrapper>
    </section>
  );
}

const fields = [
  { type: "email", name: "email", placeholder: "Enter your email" },
  { type: "password", name: "password", placeholder: "Enter your password" },
];
