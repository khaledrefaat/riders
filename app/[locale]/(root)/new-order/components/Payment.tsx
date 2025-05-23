"use client";

import Badge from "@/components/common/Badge";
import CustomButton from "@/components/common/CustomButton";
import Separator from "@/components/common/Separator";
import ApplePayIcon from "@/components/icons/ApplePayIcon";
import CardWalletIcon from "@/components/icons/CardWalletIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import KnetIcon from "@/components/icons/KnetIcon";
import LocationPinIcon from "@/components/icons/LocationPinIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import { cn } from "@/lib/utils";
import { ACTIVE_PAYMENT, WhenToDeliver, WhoWillPay } from "@/types/ordersTypes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CouponDrawer from "./CouponDrawer";
import { DateTimePicker } from "./DateTimePicker";

const paymentMethods = [
  {
    type: ACTIVE_PAYMENT.CARD,
    labelKey: "card",
    icon: CreditCardIcon,
  },
  {
    type: ACTIVE_PAYMENT.WALLET,
    labelKey: "wallet",
    icon: CardWalletIcon,
  },
  {
    type: ACTIVE_PAYMENT.APPLE_PAY,
    labelKey: "pay",
    icon: ApplePayIcon,
    hideLabel: true,
  },
  {
    type: ACTIVE_PAYMENT.KNET,
    labelKey: "knet",
    icon: KnetIcon,
  },
];

export default function Payment() {
  const [whoPays, setWhoPays] = useState<WhoWillPay>(WhoWillPay.SENDER);
  const [whenToDeliver, setWhenToDeliver] = useState<WhenToDeliver>(
    WhenToDeliver.NOW
  );
  const [activePayment, setActivePayment] = useState<ACTIVE_PAYMENT | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const t = useTranslations("orders");

  useEffect(() => {
    if (whenToDeliver === WhenToDeliver.PRE_ORDER && !date) {
      setIsOpen(true);
    }
  }, [whenToDeliver, date]);

  return (
    <div className="px-5  md:px-10">
      <h4 className="text-lg ">{t("who_will_pay")}</h4>
      <div className="flex items-center mt-3">
        <CustomButton
          variant={whoPays === WhoWillPay.SENDER ? "primary" : "gray"}
          size="lg"
          className="w-full  focus:ring-0"
          onClick={() => setWhoPays(WhoWillPay.SENDER)}
        >
          {t("sender")}
        </CustomButton>
        <CustomButton
          variant={whoPays === WhoWillPay.RECIPIENT ? "primary" : "gray"}
          size="lg"
          className="w-full  focus:ri ng-0"
          onClick={() => setWhoPays(WhoWillPay.RECIPIENT)}
        >
          {t("recipient")}
        </CustomButton>
      </div>
      <Title label={t("whenToDeliver")} />

      <div className="flex items-center mt-3">
        <CustomButton
          variant={whenToDeliver === WhenToDeliver.NOW ? "primary" : "gray"}
          size="lg"
          className="w-full  focus:ring-0"
          onClick={() => setWhenToDeliver(WhenToDeliver.NOW)}
        >
          {t("now")}
        </CustomButton>
        <CustomButton
          variant={
            whenToDeliver === WhenToDeliver.PRE_ORDER ? "primary" : "gray"
          }
          size="lg"
          className="w-full  focus:ring-0"
          onClick={() => setWhenToDeliver(WhenToDeliver.PRE_ORDER)}
        >
          {t("preorder")}
        </CustomButton>
      </div>
      {whenToDeliver === WhenToDeliver.PRE_ORDER && (
        <DateTimePicker
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Separator className="my-6" />

      <Title label={t("deliverItWhere")} />
      <div className="flex-row-between mt-5">
        <p className="flex items-center gap-x-2">
          <LocationPinIcon /> 1234 Al-Sabah Street, Block 5, Hawalli House
          14-180
        </p>
        <ChevronDownIcon className="-rotate-90 text-custom-black" />
      </div>

      <Separator className="my-6" />

      <div className="relative">
        <input
          className="w-full p-5 border-0 ring-0 outline-0 bg-customGray-500 text-primary placeholder:text-primary ltr:pl-10 rtl:pr-10 rounded-[10px] hidden md:block"
          placeholder={t("enterYourCoupon")}
        />
        <TicketIcon
          className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 hidden md:block"
          height={18}
          width={18}
        />
        <CouponDrawer />
      </div>

      <div className="mt-5 p-5 bg-customGray-500 rounded-[10px]">
        <div className="flex-row-between">
          <span className="">{t("subtotal")}</span>
          <span className="line-through ltr:mr-2 rtl:ml-2">
            1.500 {t("kwd")}
          </span>
        </div>
        <div className="flex-row-between mt-2">
          <span>
            <Badge variant="danger" size="sm">
              {t("couponDiscount")}:
            </Badge>
          </span>
          <span>
            <Badge variant="danger" size="sm">
              0.250 {t("kwd")}
            </Badge>
          </span>
        </div>
        <div className="flex-row-between mt-2">
          <span className="text-xl">{t("total")}:</span>
          <span className="text-xl">1.250 {t("kwd")}</span>
        </div>
        <h4 className="mt-3">{t("deliveryFeeDescription")}</h4>
      </div>
      <Title label={t("payment_method")} />
      <PaymentSelector
        activePayment={activePayment}
        setActivePayment={setActivePayment}
      />

      <CustomButton size="lg" className="w-full mt-8">
        {t("confirm_payment")}
      </CustomButton>
    </div>
  );
}

function Title({ label }: { label: string }) {
  return <h2 className="text-3xl text-primary mt-8 ">{label}</h2>;
}

interface PaymentMethodProps {
  label: string;
  Icon: React.FC<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  hideLabel?: boolean;
}

function PaymentMethod({
  label,
  Icon,
  isActive,
  onClick,
  hideLabel,
}: PaymentMethodProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-[70px] w-full items-center justify-center gap-2 rounded-[10px] bg-customGray-400 text-xl cursor-pointer",
        isActive && "bg-primary text-white"
      )}
      aria-label={`payment-method-${label}`}
    >
      <Icon
        className={cn(isActive ? "text-white fill-white" : "text-primary")}
      />
      {!hideLabel && label}
    </button>
  );
}

// Usage in parent component
function PaymentSelector({
  activePayment,
  setActivePayment,
}: {
  activePayment: ACTIVE_PAYMENT | null;
  setActivePayment: (payment: ACTIVE_PAYMENT) => void;
}) {
  const t = useTranslations("orders");

  return (
    <div className="mt-5 grid grid-cols-2 gap-5">
      {paymentMethods.map(({ type, labelKey, icon: Icon, hideLabel }) => (
        <PaymentMethod
          key={type}
          label={t(labelKey)}
          Icon={Icon}
          isActive={activePayment === type}
          onClick={() => setActivePayment(type)}
          hideLabel={hideLabel}
        />
      ))}
    </div>
  );
}
