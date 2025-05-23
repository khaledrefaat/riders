"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function SocialContinue() {
  const t = useTranslations("auth");
  function handelGoogleLogin() {
    console.log("Google login");
  }

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-center gap-x-2">
        <div className="h-[1px] bg-gray-100 w-[50px]" />
        <span className="text-gray-150">{t("orSignInWith")}</span>
        <div className="h-[1px] bg-gray-100 w-[50px]" />
      </div>
      <div className="flex flex-row items-center justify-center mt-[15px]">
        <Button
          variant="outline"
          className="w-full flex ltr:flex-row rtl:flex-row-reverse items-center justify-center gap-x-3 h-12 bg-gray-50 border-gray-200 hover:bg-gray-100"
          onClick={handelGoogleLogin}
        >
          <Image
            src="/google.png"
            alt="Google"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-custom-black text-lg ">
            {t("continueWithGoogle")}
          </span>
        </Button>
      </div>
    </div>
  );
}
