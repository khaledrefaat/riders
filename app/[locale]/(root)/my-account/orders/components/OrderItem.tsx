import Badge from "@/components/common/Badge";
import Separator from "@/components/common/Separator";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { OrderStatus } from "@/types/ordersTypes";
import { getTranslations } from "next-intl/server";

interface Props {
  created_at: Date;
  orderId: string;
  total: number;
  status: OrderStatus;
  from: string;
  to: string;
}

export default async function OrderItem({
  created_at,
  orderId,
  total,
  status,
  from,
  to,
}: Props) {
  const t = await getTranslations("myAccount");

  return (
    <>
      <div className="bg-white px-5 mb-4 p-4 rounded-[10px]">
        <span className="p-2 md:text-xl bg-blueSky text-primary rounded-[5px]">
          {t(status)}
        </span>
        <div className="flex-row-between mt-5">
          <p className="md:text-xl">{formatDate(created_at)}</p>
          <p className="md:text-xl">
            {total} {t("kwd")}
          </p>
        </div>
        <Separator className="my-5 bg-customGray-450" />
        <div className="flex-row-between">
          <Badge variant="secondary" size="lg" className="text-sm md:text-xl">
            {t("from")}: {from} {t("to")}: {to}
          </Badge>
          <Link className="text-primary underline md:text-xl" href="new-order">
            {t("orderAgain")}
          </Link>
        </div>
        <div className="flex-row-between mt-4">
          <p className="md:text-xl">
            {t("orderId")}: #{orderId}
          </p>
          <Link
            className="md:text-xl bg-customGray-500 text-custom-black py-1 px-3 rounded-sm"
            href={`/order/${orderId}`}
          >
            {t("viewInvoice")}
          </Link>
        </div>
      </div>
      <Separator size="lg" className="mt-[30px] mb-[20px] hidden md:block" />
    </>
  );
}
