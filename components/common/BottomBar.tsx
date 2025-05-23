"use client";

import HomeIcon from "../icons/HomeIcon";
import FormIcon from "../icons/FormIcon";
import WalletIcon from "../icons/WalletIcon";
import AccountIcon from "../icons/AccountIcon";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function BottomBar() {
  const t = useTranslations("bottomBar");

  const navItems = [
    { name: t("home"), href: "/home", icon: HomeIcon },
    { name: t("orderForm"), href: "/new-order", icon: FormIcon },
    { name: t("wallet"), href: "/wallet", icon: WalletIcon },
    { name: t("account"), href: "/my-account", icon: AccountIcon },
  ];

  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 bg-white border-t border-gray-200 right-0 flex justify-around items-center h-16 shadow-lg md:hidden">
      {navItems.map((Item) => (
        <Link
          key={Item.href}
          href={Item.href}
          className={`flex flex-col items-center justify-center w-full h-full text-sm transition-colors ${
            pathname.includes(Item.href)
              ? "text-primary"
              : "text-customGray-150"
          }`}
        >
          <Item.icon
            className={`w-6 h-6 mb-1 ${
              pathname.includes(Item.href)
                ? "text-primary"
                : "text-customGray-150"
            }`}
          />
          <span>{Item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
