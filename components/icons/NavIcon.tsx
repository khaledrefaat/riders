import { cn } from "@/lib/utils";
import React from "react";

export default function NavIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-6 text-white", className)}
      viewBox="0 0 38 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1L37.375 1" stroke="currentColor" strokeWidth="2" />
      <path d="M0 12.5L24.4375 12.5" stroke="currentColor" strokeWidth="2" />
      <path d="M0 24L37.375 24" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
