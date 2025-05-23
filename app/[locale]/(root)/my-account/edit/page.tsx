import { getTranslations } from "next-intl/server";
import FormData from "./components/FormData";
import BackButtonTitle from "@/components/common/BackButtonTitle";
import MainContainer from "@/components/layout/MainContainer";

export default async function page() {
  const t = await getTranslations("myAccount");
  return (
    <MainContainer>
      <BackButtonTitle title={t("edit")} />
      <div className="bg-white md:bg-customGray-500 pt-8 md:pt-[70px]">
        <h2 className="text-[40px] font-semibold text-center hidden md:block mb-8">
          {t("edit")}
        </h2>
        <div className="bg-white flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-10 py-8 md:p-10">
          <FormData />
        </div>
      </div>
    </MainContainer>
  );
}
