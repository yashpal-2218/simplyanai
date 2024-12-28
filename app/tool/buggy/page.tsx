import BuggyContainer from "@/components/section/buggy-container";
import React from "react";

export default function Page() {
  return (
    <>
      {/* visible only on large screen sizes */}
      <div className="w-screen h-screen grid place-items-center font-extrabold text-xl text-center lg:hidden">
        This application is not usable in your device.
      </div>
      <div className="hidden lg:block">
        <BuggyContainer />
      </div>
    </>
  );
}
