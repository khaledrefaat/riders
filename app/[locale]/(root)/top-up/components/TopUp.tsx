"use client";

import CustomButton from "@/components/common/CustomButton";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TopUp() {
  const t = useTranslations("topUp");
  const router = useRouter();
  const [amount, setAmount] = useState(0);

  function handelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  function handelSubmit() {
    if (amount > 20 && amount !== 0) {
      toast.error(t("description"));
    } else {
      toast.success(t("success"));
      router.push("/wallet");
    }
    console.log(amount);
  }

  return (
    <>
      <div className="text-center">
        <input
          onChange={handelInputChange}
          value={amount}
          className="w-[155px] md:w-[240px] h-[60px] md:h-[80px] rounded-[10px] bg-blueSky text-[36px] md:text-[40px] text-primary text-center"
          type="number"
        />
      </div>
      <p className="md:text-xl text-center max-w-[80%] md:max-w-[350px] mx-auto mt-2.5 md:mt-6">
        {t("description")}
      </p>
      <div className="flex gap-x-4 md:gap-x-5 justify-center mt-4 md:mt-7">
        <TopUpButton
          amount={5}
          kwd={t("kwd")}
          onClick={() => setAmount(5)}
          isActive={amount === 5}
        />
        <TopUpButton
          amount={10}
          kwd={t("kwd")}
          onClick={() => setAmount(10)}
          isActive={amount === 10}
        />
        <TopUpButton
          amount={20}
          kwd={t("kwd")}
          onClick={() => setAmount(20)}
          isActive={amount === 20}
        />
      </div>
      <CustomButton onClick={handelSubmit} className="w-full mt-32 md:mt-10">
        {t("topUp")}
      </CustomButton>
    </>
  );
}

function TopUpButton({
  amount,
  kwd,
  onClick,
  isActive,
}: {
  amount: number;
  kwd: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-[90px] md:w-[112px] h-[40px] md:h-[50px] rounded-[10px] bg-blueSky text-custom-black cursor-pointer transition-colors hover:bg-primary hover:text-white text-xl md:text-lg",
        isActive && "bg-primary text-white"
      )}
    >
      {amount} {kwd}
    </button>
  );
}
