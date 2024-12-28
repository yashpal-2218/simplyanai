"use client";
import { useEffect, useState } from "react";
import { setAuthState } from "./auth-slice";
import { useAppDispatch, useAppSelector } from "./store";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const authState = useAppSelector((state) => state.auth.authState);
  const dispatch = useAppDispatch();

  async function getUser() {
    try {
      const res = await axios.get("/api/user");

      if (res.data.success) {
        console.log("success", res.data.user);
        dispatch(setAuthState(res.data.user));
      }
    } catch (error) {
      console.error("Error fetching user: route: api/user", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [authState]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center select-none">
      <LoaderCircle
        className="transition animate-spin"
        color="gray"
        size={"4rem"}
      />
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-2xl">You are an apple in my eyes</h1>
        <span className="text-4xl">😘</span>
      </div>
    </div>
  );
}
