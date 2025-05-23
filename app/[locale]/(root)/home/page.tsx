import Badge from "@/components/common/Badge";
import IntroBox from "@/components/common/IntroBox";
import Separator from "@/components/common/Separator";
import OutlineFormIcon from "@/components/icons/OutlineFormIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import RetryIcon from "@/components/icons/RetryIcon";
import TrackOrderIcon from "@/components/icons/TrackOrderIcon";
import MainContainer from "@/components/layout/MainContainer";
import { CURRENT_ORDER } from "@/constants/DUMMY_DATA";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import WelcomeBack from "./components/WelcomeBox";
import { getWallet } from "@/services/wallet-services";
import { Locale } from "@/types";

export default async function page() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const walletData = await getWallet(token!, locale);

  return (
    <MainContainer>
      <div className="bg-white md:bg-customGray-500 grid md:grid-cols-2 md:gap-x-5 md:grid-rows-[max-content_max-content] md:mb-20 md:pt-16 px-5 md:px-10">
        <div className="md:col-start-1 md:col-end-2 row-start-1 row-end-2 flex justify-center ">
          <WelcomeBack amount={Number(walletData.data.balance)} />
        </div>
        <div className="md:col-start-1 md:col-end-2">
          <div className="xl:w-xl shadow-boxes rounded-[10px] xl:px-10 py-8 ltr:ml-auto rtl:mr-auto">
            <div className="rounded-[10px] w-full gap-x-5 gap-y-6 grid grid-cols-2 justify-items-center">
              <ActionButton
                title={t("newOrder")}
                link="/new-order"
                icon={<PlusIcon />}
              />
              <ActionButton
                title={t("reOrder")}
                link="/new-order"
                icon={<RetryIcon />}
              />
              <ActionButton
                title={t("myOrders")}
                link="/my-account/orders"
                icon={<OutlineFormIcon height="15" width="15" />}
              />
              <ActionButton
                title={t("trackOrder")}
                link="/my-account/orders"
                icon={<TrackOrderIcon className="text-white" />}
              />
            </div>
            <h3 className="text-2xl mt-3 ltr:mr-auto rtl:ml-auto">
              {t("recentActivity")}
            </h3>
            <div className="p-5 bg-white rounded-[10px] mt-4">
              <Badge variant="blueSky" rounded size="sm">
                {t("currentOrder")}
              </Badge>
              <div className="flex-row-between mt-5">
                <p className="text-xl " dir="ltr">
                  {formatDate(new Date())}
                </p>
                <p className="text-xl text-primary ">
                  {CURRENT_ORDER.amount} {t("kwd")}
                </p>
              </div>
              <Separator className="my-5" />
              <Badge variant="secondary" size="lg">
                {t("from")}: {CURRENT_ORDER.from} {t("to")}: {CURRENT_ORDER.to}
              </Badge>
              <p className="text-xl mt-4">
                {t("orderId")}: #{CURRENT_ORDER.orderId}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full h-[280px] md:h-full row-start-2 row-end-3  md:col-start-2 md:row-start-1 md:row-end-3">
          <IntroBox className="w-full" />
        </div>
      </div>
    </MainContainer>
  );
}

function ActionButton({
  title,
  link,
  icon,
}: {
  title: string;
  icon: ReactNode;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="w-full h-max py-2 md:py-0 xl:w-[225px] md:h-[140px] border border-primary rounded-[10px] flex-col-center"
    >
      <div className="bg-primary size-10 md:size-14 rounded-full flex-center">
        {icon}
      </div>
      <span className="text-lg md:text-xl md:mt-2 text-primary">{title}</span>
    </Link>
  );
}
