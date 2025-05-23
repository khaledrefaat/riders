import React from "react";
import { getTranslations } from "next-intl/server";
import FormData from "./components/FormData";

export default async function page() {
  const t = await getTranslations("auth");

  return (
    <div className="bg-white pt-28 md:bg-customGray-500">
      <div className="bg-white flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-6 py-8 md:p-10">
        <h1 className="text-4xl md:text-[40px] text-primary  text-center">
          {t("changePassword")}
        </h1>
        <FormData />
      </div>
    </div>
  );
}
