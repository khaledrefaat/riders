"use client";

import { useRouter } from "@/i18n/routing";
import { logout } from "@/services/auth-services";
import { useAuthStore } from "@/store/auth-store";
import { Locale } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import CustomButton from "./CustomButton";

export default function LogoutButton() {
  const locale = useLocale() as Locale;
  const t = useTranslations("myAccount");
  const [loading, setLoading] = useState(false);
  const storeLogout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const token = useAuthStore((state) => state.getToken());

  async function handelLogout() {
    setLoading(true);
    try {
      storeLogout();
      const res = await logout(token!, locale);
      if (res.success) {
        toast.success(res.message);
      }
      router.replace("/");
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        aria-label="logout"
        className="bg-white border-white text-primary underline text-2xl mt-4 cursor-pointer ltr:text-left rtl:text-right px-4 hidden md:block"
        onClick={handelLogout}
      >
        {t("logout")}
      </button>
      <CustomButton
        className="w-full mt-4 md:hidden"
        size="md"
        onClick={handelLogout}
      >
        {t("logout")}
      </CustomButton>
      {loading && <Loading />}
    </>
  );
}
