"use client";
import CustomButton from "@/components/common/CustomButton";
import Separator from "@/components/common/Separator";
import TicketIcon from "@/components/icons/TicketIcon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useTranslations } from "next-intl";

export default function CouponDrawer() {
  const t = useTranslations("orders");
  return (
    <Drawer>
      <DrawerTrigger className="relative w-full p-5 border-0 ring-0 outline-0 bg-customGray-500 text-primary rounded-[10px] flex items-center justify-center md:hidden">
        <span>{t("enterYourCoupon")}</span>
        <TicketIcon
          className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3"
          height={18}
          width={18}
        />
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className="px-0 py-4">
          <DrawerTitle className="text-xl font-semibold">
            {t("applyCoupon")}
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <Separator className="mb-5 bg-[#C9C9C9]" />
        <input className="w-full h-[40px] border-1 border-[#C9C9C9] ring-0 outline-0 text-primary rounded-[10px]" />
        <DrawerFooter className="p-0 mb-5 mt-7">
          <DrawerClose asChild>
            <CustomButton className="w-full">Submit</CustomButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
