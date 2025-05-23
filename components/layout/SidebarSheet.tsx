"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileItem from "../common/ProfileItem";
import { useTranslations } from "next-intl";
import OutlineFormIcon from "../icons/OutlineFormIcon";
import WalletIcon from "../icons/WalletIcon";
import CheckAccountIcon from "../icons/CheckAccountIcon";
import NavIcon from "../icons/NavIcon";
import Separator from "../common/Separator";
import LogoutButton from "../common/LogoutButton";
import { useAuthStore } from "@/store/auth-store";

export default function SidebarSheet() {
  const t = useTranslations("myAccount");
  const userData = useAuthStore((state) => state.user);

  return (
    <Sheet>
      <SheetTrigger>
        <NavIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pt-10 px-7">
          <SheetTitle className="text-2xl text-custom-black">
            {userData.name}
          </SheetTitle>
          <SheetDescription className="text-xl text-custom-black">
            +{userData.country_code} {userData.phone}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator className="h-[6px] -mt-3 mb-5" />
          <ProfileItem
            title={t("orders")}
            Icon={OutlineFormIcon}
            href="/my-account/orders"
          />
          <ProfileItem
            title={t("wallet")}
            Icon={WalletIcon}
            href="/my-account/wallet"
          />
          <ProfileItem
            title={t("account")}
            Icon={CheckAccountIcon}
            href="/my-account"
          />
          <LogoutButton />
        </div>
        <SheetFooter>
          <SheetClose></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
