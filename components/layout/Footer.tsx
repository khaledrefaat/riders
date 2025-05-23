import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="hidden w-screen px-20 pb-6 md:grid items-center grid-cols-[max-content_max-content_max-content_1fr] gap-x-10 xl:gap-x-0 xl:grid-cols-[max-content_250px_250px_1fr]">
      <p className="text-sm lg:text-lg">{t("copyRight")}</p>
      <Link
        className="text-sm lg:text-lg ltr:text-right rtl:text-left"
        href="/privacy-policy"
      >
        {t("privacyPolicy")}
      </Link>
      <Link
        className="text-sm lg:text-lg ltr:text-right rtl:text-left"
        href="/terms-of-conditions"
      >
        {t("termsOfConditions")}
      </Link>
      <Link
        target="_blank"
        href="https://websight.kw/en"
        aria-label="websight"
        className="ltr:ml-auto rtl:mr-auto"
      >
        <Image
          src="/websight-logo.png"
          alt="websight-logo"
          width={100}
          height={30}
          className="w-[100px] h-[30px] object-contain"
          aria-label="websight-logo"
        />
      </Link>
    </footer>
  );
}
