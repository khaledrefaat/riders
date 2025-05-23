"use client";
import WalletIcon from "@/components/icons/WalletIcon";
import CustomButton from "@/components/common/CustomButton";
import { useAuthStore } from "@/store/auth-store";
import { useTranslations } from "next-intl";

export default function WelcomeBack({ amount }: { amount: number }) {
  const t = useTranslations("home");
  const userData = useAuthStore((state) => state.user);

  return (
    <div className="flex justify-between shadow-boxes py-5 rounded-[10px] items-center xl:px-10 w-full xl:w-xl ltr:ml-auto rtl:mr-auto">
      <div>
        <h2 className="text-2xl">
          {t("welcomeBack")}, {userData?.name}
        </h2>
        <p className="flex items-center gap-x-2  text-xl mt-2">
          <WalletIcon /> {t("wallet")}: {amount} {t("kwd")}
        </p>
      </div>
      <CustomButton variant="primary" size="sm" className="w-[100px] ">
        {t("topUp")}
      </CustomButton>
    </div>
  );
}
