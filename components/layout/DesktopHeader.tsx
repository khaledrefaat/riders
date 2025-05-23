"use client";

import React from "react";
import Image from "next/image";
import LanguageSwitch from "../common/LanguageSwitch";
import { cn } from "@/lib/utils";
import SidebarSheet from "./SidebarSheet";
import { Link } from "@/i18n/routing";

interface DesktopHeaderProps {
  className?: string;
}

export default function DesktopHeader({ className }: DesktopHeaderProps) {
  return (
    <header
      className={cn(
        "hidden md:flex h-[101px] items-center justify-center bg-primary px-20",
        className
      )}
    >
      <SidebarSheet />
      <Link href="/home" className="mx-auto">
        <Image
          src="/light-logo.png"
          alt="Logo"
          width={230}
          height={50}
          className="object-contain"
          priority
        />
      </Link>
      <LanguageSwitch
        size="lg"
        variant="white"
        className="justify-center gap-x-2 w-[131px]"
      />
    </header>
  );
}
