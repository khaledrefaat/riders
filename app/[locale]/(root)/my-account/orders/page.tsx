import BackButtonTitle from "@/components/common/BackButtonTitle";
import { ORDER_LIST } from "@/constants/DUMMY_DATA";
import { getTranslations } from "next-intl/server";
import OrderItem from "./components/OrderItem";
import MainContainer from "@/components/layout/MainContainer";

export default async function page() {
  const t = await getTranslations("myAccount");
  return (
    <MainContainer className="bg-customGray-500 -mt-10 pt-10 md:pt-0 md:mt-0">
      <BackButtonTitle title={t("orders")} />
      <div className="pt-8 md:pt-[50px] md:mb-20">
        <h2 className="text-[40px] font-semibold text-center hidden md:block mb-8">
          {t("orders")}
        </h2>
        <div className="flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-5 py-8 md:p-10 md:bg-white">
          {ORDER_LIST.map((order) => (
            <OrderItem key={order.orderId} {...order} />
          ))}
        </div>
      </div>
    </MainContainer>
  );
}
