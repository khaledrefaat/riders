"use client";
import { useRouter } from "@/i18n/routing";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BackButtonTitle({
  title,
  className,
  titleClassName,
}: {
  title?: string;
  className?: string;
  titleClassName?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div
      className={cn("flex items-center w-full px-6 mt-8 md:hidden", className)}
      dir="ltr"
    >
      <button onClick={handleBack} aria-label="back">
        <ChevronLeftIcon className="text-black" />
      </button>
      <h2 className={cn("text-2xl font-semibold mx-auto", titleClassName)}>
        {title}
      </h2>
    </div>
  );
}
