import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import FormData from "./components/FormData";

export default async function page() {
  const t = await getTranslations("auth");

  return (
    <div className="bg-white pt-14 md:bg-customGray-500">
      <div className="bg-white flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-6 py-8 md:p-10">
        <h1 className="text-4xl md:text-[40px] text-primary  text-center">
          {t("signIn")}
        </h1>

        <div className="flex flex-row mt-3 gap-x-2 md:mt-8 justify-center">
          <p className="text-lg md:text-lg ">{t("dontHaveAccount")} </p>
          <Link
            href="/auth/sign-up"
            className="text-secondary text-lg md:text-lg  ml-1"
          >
            {t("signUp")}
          </Link>
        </div>

        <FormData />

        <div className="flex flex-row mt-3 gap-x-2 md:mt-8 justify-center">
          <p className="text-lg md:text-lg ">{t("forgotPassword")}</p>
          <Link
            href="/auth/reset-password"
            className="text-secondary text-lg md:text-lg  ml-1"
          >
            {t("resetIt")}
          </Link>
        </div>

        <Link
          href="/new-order"
          className="block underline text-primary text-lg text-center  mt-6"
        >
          {t("continueAsGuest")}
        </Link>
      </div>
    </div>
  );
}
