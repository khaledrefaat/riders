import BackButtonTitle from "@/components/common/BackButtonTitle";
import { WALLET_TRANSACTIONS } from "@/constants/DUMMY_DATA";
import { getTranslations } from "next-intl/server";
import MainContainer from "@/components/layout/MainContainer";
import WalletItem from "./components/WalletItem";
import CoinsIcon from "@/components/icons/CoinsIcon";
import { Link } from "@/i18n/routing";

export default async function page() {
  const t = await getTranslations("myAccount");
  return (
    <MainContainer className="bg-white md:bg-customGray-500 -mt-10 pt-10 md:pt-0 md:mt-0">
      <BackButtonTitle title={t("wallet")} />
      <div className="pt-8 md:pt-[50px] md:mb-20">
        <h2 className="text-[40px] font-semibold text-center hidden md:block mb-8">
          {t("wallet")}
        </h2>
        <div className="flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-5 py-8 md:p-10 md:bg-white">
          <div className="h-[180px] bg-white rounded-[10px] border border-customGray-450 flex-center relative gap-x-2 text-primary text-[36px] md:text-[40px] mb-6">
            <CoinsIcon /> 50 {t("kwd")}
            <Link
              href="/top-up"
              className="underline text-primary text-lg md:text-2xl absolute top-5 ltr:right-5 rtl:left-5"
            >
              {t("topUp")}
            </Link>
          </div>
          {WALLET_TRANSACTIONS.map((transaction) => (
            <WalletItem key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>
    </MainContainer>
  );
}
