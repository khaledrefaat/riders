"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DesktopHeader from "./DesktopHeader";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import LanguageSwitch from "../common/LanguageSwitch";

interface AuthHeaderProps {
  noBack?: boolean;
  className?: string;
}

export default function AuthHeader({
  noBack = false,
  className,
}: AuthHeaderProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  useEffect(() => {
    // Check if window width is greater than mobile breakpoint (768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkDesktop();

    // Add listener for window resize
    window.addEventListener("resize", checkDesktop);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  if (isDesktop) {
    return <DesktopHeader />;
  }

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full px-6 absolute top-10",
        className
      )}
      dir="ltr"
    >
      {!noBack && (
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100/10 rounded-full"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="text-black" />
        </button>
      )}
      <LanguageSwitch className={cn(noBack && "ml-auto")} variant="primary" />
    </header>
  );
}
