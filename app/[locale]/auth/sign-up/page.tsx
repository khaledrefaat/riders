import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import FormData from "./components/FormData";
import IntroBox from "@/components/common/IntroBox";

export default async function page() {
  const t = await getTranslations("auth");

  return (
    <div className="min-h-screen bg-white md:bg-customGray-500">
      <div className="pt-14 md:bg-transparent md:grid md:grid-cols-2 md:py-12 md:px-6 gap-x-14 xl:gap-x-20">
        <div className="bg-white flex-1 ltr:ml-auto rtl:mr-auto md:rounded-[20px] xl:max-w-xl px-6 py-8 md:p-10">
          <div className="w-1/2 mx-auto md:hidden">
            <Image
              src="/dark-logo.png"
              alt="Logo"
              width={200}
              height={80}
              className="w-full"
            />
          </div>

          <h1 className="text-4xl md:text-[40px] text-primary  text-center">
            {t("createYourAccount")}
          </h1>

          <div className="flex flex-row mt-3 gap-x-2 md:mt-8 justify-center">
            <p className="text-lg md:text-lg ">{t("alreadyHaveAnAccount")}</p>
            <Link
              href="/auth/login"
              className="text-secondary text-lg md:text-lg  ml-1"
            >
              {t("signIn")}
            </Link>
          </div>

          <FormData />

          <p className="text-gray-150  mt-6 text-center">
            {t("signUpAgree")}{" "}
            <Link href="/terms" className="text-primary underline ">
              {t("termsOfUse")}
            </Link>
            <span> {t("and")} </span>
            <Link href="/privacy" className="text-primary underline ">
              {t("privacyPolicy")}
            </Link>
          </p>

          <Link
            href="/new-order"
            className="block underline text-primary text-lg text-center  mt-6"
          >
            {t("continueAsGuest")}
          </Link>
        </div>

        <IntroBox mobileHidden />
      </div>
    </div>
  );
}
