"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface IntroBoxProps {
  mobileHidden?: boolean;
  className?: string;
}

export default function IntroBox({
  mobileHidden = false,
  className,
}: IntroBoxProps) {
  const t = useTranslations("auth");

  return (
    <div
      className={cn(
        "bg-primary rounded-[20px] py-12 md:py-0 md:h-full md:flex-1 xl:max-w-xl flex flex-col items-center justify-center",
        mobileHidden && "hidden md:flex",
        className
      )}
    >
      <Image
        src="/large-logo.png"
        alt="Logo"
        width={280}
        height={200}
        className="object-contain"
        priority
      />
      <h2 className="text-white mt-5 md:mt-8 text-2xl md:text-4xl ">
        {t("everythingIsNear")}
      </h2>
    </div>
  );
}
