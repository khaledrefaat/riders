import CustomButton from "./CustomButton";
import { cn } from "@/lib/utils";
// import ChevronDownIcon from "../icons/ChevronDownIcon";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

enum Language {
  AR = "ar",
  EN = "en",
}

interface LanguageSwitchProps {
  className?: string;
  variant?: "primary" | "white";
  size?: "sm" | "lg";
}

export default function LanguageSwitch({
  className,
  variant,
  size,
}: LanguageSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function handleLanguageChange(e: React.MouseEvent<HTMLButtonElement>) {
    let newLang;
    if (locale === "ar") {
      newLang = Language.EN;
    } else {
      newLang = Language.AR;
    }
    e.preventDefault();
    const query =
      (window.location.href.includes("?") &&
        `?${window.location.href.split("?")[1]}`) ||
      "";
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLang.toLocaleLowerCase()}/${path}${query}`);
  }

  return (
    <CustomButton
      rounded="full"
      className={cn("w-max flex flex-row items-center px-4 gap-x-2", className)}
      size={size || "sm"}
      variant={variant}
      //   @ts-expect-error type error
      onClick={handleLanguageChange}
      //   the language is flipped, so we need to flip the direction
      dir={locale == "ar" ? "ltr" : "rtl"}
    >
      {/* if the background id white, the text should be primary and icon should be primary */}
      <span className={variant == "white" ? "text-primary" : "text-white"}>
        {locale == Language.AR ? "English" : "عربي"}
      </span>
      {/* <ChevronDownIcon
        className={variant == "white" ? "text-primary" : "text-white"}
      /> */}
    </CustomButton>
  );
}
