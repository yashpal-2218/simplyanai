"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { setAuthState } from "@/lib/auth-slice";
import { logoutUser } from "@/services/user";

export function Navbar() {
  const authState = useAppSelector((state) => state.auth.authState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const headerSection = document.querySelector("header");
    const heroSection = document.querySelector("#hero-section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          headerSection?.classList.replace("bg-transparent", "bg-black");
        } else {
          headerSection?.classList.replace("bg-black", "bg-transparent");
        }
      });
    });
    if (heroSection) {
      observer.observe(heroSection);
    }
  });

  // export async function logoutUser() {
  //   try {
  //     const res = await axios.get("/user/logout");
  //     if (!res.data.success) {
  //       router.push("/");
  //       return;
  //     }

  //     toast.toast({ title: "Logout failed", description: "Please try again" });
  //   } catch (error) {
  //     console.log("Error logging out", error);
  //     toast.toast({ title: "Server error", description: "Please try again" });
  //   }
  // }

  async function handleLoginLogout() {
    if (!authState) {
      router.push("user/login");
      return;
    }

    const res = await logoutUser();
    if (res.data.success) {
      router.push("/");
      dispatch(setAuthState(null));
      return;
    }
    toast.toast({ title: "Logout failed", description: "Please try again" });
  }

  return (
    <>
      <header className="w-full h-24 transition-colors ease-linear delay-75 bg-transparent backdrop-blur-lg shadow-sm fixed z-50">
        <div className="px-3 sm:px-10 h-full flex items-center justify-between">
          <div className="relative w-20 aspect-square flex items-center">
            <h1 className="font-mono text-2xl font-extrabold">Simplyanai</h1>
          </div>
          <nav className="flex justify-end">
            <ul className="flex items-center gap-5">
              {navItems.map((item) => {
                return (
                  <li key={item.id}>
                    <Link href={item._link} className="text-xl font-bold">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* <div className="w-10 aspect-square rounded-full bg-blue-500 justify-end"> */}
          {/* <div className="flex gap border border-1 border-black p-20"> */}
          <Button onClick={handleLoginLogout}>
            {!authState ? "Login" : "Logout"}
          </Button>
          {/* </div> */}
          {/* </div> */}
        </div>
      </header>
    </>
  );
}

const navItems = [
  {
    id: 1,
    name: "Services",
    _link: "#services-section",
  },
];
