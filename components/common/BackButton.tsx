"use client";

import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React from "react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        "absolute top-10 left-6 z-10 md:hidden cursor-pointer",
        className
      )}
      aria-label="back"
    >
      <ChevronLeftIcon className="text-black" />
    </button>
  );
}
