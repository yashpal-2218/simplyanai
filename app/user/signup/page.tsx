"use client";
import AuthWrapper from "@/components/cards/auth-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/services/user";

export default function Page() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // data validation
      setError("");
      const res = await signupUser(formData);
      if (!res.data.success) {
        console.log(res.data.error);
        setError(res.data.error);
        return;
      }
      router.push(`/user/verify-email?email=${formData.email}`);
    } catch (error) {
      setError("Server error occured");
      console.error(error);
    }
  }

  return (
    <section className="w-screen h-screen grid place-items-center">
      <AuthWrapper>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mt-5">
            {fields.map((field, idx) => {
              return (
                <div className="my-2" key={idx}>
                  <Input {...field} onChange={handleInputChange} />
                </div>
              );
            })}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-5">
            <Button type="submit" className="w-full text-center text-lg">
              Signup
            </Button>
          </div>
          <CardFooter className="mt-2">
            <p>
              Already have an account?{" "}
              <Link
                href={"/user/login"}
                className="text-secondary-foreground font-bold"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </AuthWrapper>
    </section>
  );
}

const fields = [
  { type: "text", name: "name", placeholder: "Enter your name" },
  { type: "email", name: "email", placeholder: "Enter your email" },
  { type: "password", name: "password1", placeholder: "Enter your password" },
  { type: "password", name: "password2", placeholder: "Confirm your password" },
];
