import Separator from "@/components/common/Separator";
import { formatLocalizedDate } from "@/lib/utils";
import { Locale, WalletTransactionTypes } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";

interface Props {
  status: WalletTransactionTypes;
  created_at: Date;
  id?: string;
  amount: number;
}

export default async function WalletItem({
  status,
  created_at,
  id,
  amount,
}: Props) {
  const t = await getTranslations("myAccount");
  const locale = (await getLocale()) as Locale;

  function statusColor(isText = false) {
    switch (status) {
      case WalletTransactionTypes.TOPUP:
        return isText ? "text-[#24AF88]" : "bg-[#D3EFE7] text-[#24AF88]";
      case WalletTransactionTypes.PAYMENT:
        return isText ? "text-[#F1432B]" : "bg-[#F1432B1A] text-[#F1432B]";
      case WalletTransactionTypes.REFUND:
        return isText ? "text-primary" : "bg-blueSky text-primary";
    }
  }

  return (
    <div>
      <div
        className={`rtl:w-[80px] ltr:w-[70px] ltr:md:w-[100px] rtl:md:w-[120px] text-center py-1 md:text-xl rounded-sm ${statusColor()}`}
      >
        {t(status)}
      </div>
      <div className="flex-row-between my-[14px] md:my-5">
        <p className="md:text-xl">
          {formatLocalizedDate(new Date(created_at), locale)}
        </p>
        <p className={`md:text-xl ${statusColor(true)}`}>
          {status === WalletTransactionTypes.PAYMENT ? "-" : "+"} {amount}{" "}
          {t("kwd")}
        </p>
      </div>
      {id && (
        <p className="md:text-xl">
          {t("orderId")} #{id}
        </p>
      )}
      <Separator className="bg-customGray-450 my-[14px] md:my-5" />
    </div>
  );
}
