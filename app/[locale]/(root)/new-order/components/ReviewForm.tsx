"use client";

import { useTranslations } from "next-intl";
import CustomButton from "@/components/common/CustomButton";
import { Link } from "@/i18n/routing";
import CustomInput from "@/components/common/CustomInput";

export default function ReviewForm() {
  const t = useTranslations("orders");
  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:px-10 px-5 mt-8">
        <h2 className="col-span-2 text-2xl  text-primary ltr:text-left rtl:text-right">
          {t("sender_information")}{" "}
        </h2>

        <CustomInput
          value="Husain Al Saffar"
          label={t("sender")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />

        <CustomInput
          value="Husain Al Saffar"
          label={t("sender_phone")}
          inputClassName="bg-primary text-white border-primary"
          type="phone"
          countryCodeStyle="text-white"
        />
        <CustomInput
          value="Hawalli"
          label={t("governorate")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />
        <CustomInput
          value="Dasman"
          label={t("area")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />
        <div className="col-span-2 grid grid-cols-4 gap-x-3">
          <CustomInput
            value="4"
            label={t("block")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="ST 14"
            label={t("street")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="12"
            label={t("house")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="12"
            label={t("avenue")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
            required={false}
          />
        </div>

        <h2 className="col-span-2 text-2xl  text-primary ltr:text-left rtl:text-right">
          {t("recipient_information")}{" "}
        </h2>

        <CustomInput
          value="Ulyana Rubiana"
          label={t("recipient")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />

        <CustomInput
          value="Husain Al Saffar"
          label={t("recipient_phone")}
          inputClassName="bg-primary text-white border-primary"
          type="phone"
          countryCodeStyle="text-white"
        />
        <CustomInput
          value="Hawalli"
          label={t("governorate")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />
        <CustomInput
          value="Dasman"
          label={t("area")}
          inputClassName="bg-primary text-white border-primary"
          type="text"
        />
        <div className="col-span-2 grid grid-cols-4 gap-x-3">
          <CustomInput
            value="4"
            label={t("block")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="ST 14"
            label={t("street")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="12"
            label={t("house")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
          />
          <CustomInput
            value="12"
            label={t("avenue")}
            inputClassName="bg-secondary text-white border-secondary"
            type="text"
            required={false}
          />
        </div>

        <div className="col-span-2 flex gap-x-8 mt-8">
          <Link href="/new-order?step=2">
            <CustomButton className="ml-auto w-[228px]" variant="gray">
              {t("back")}
            </CustomButton>
          </Link>
          <Link href="/new-order?step=4">
            <CustomButton className="ml-auto w-[228px]" onClick={() => {}}>
              {t("next")}
            </CustomButton>
          </Link>
        </div>
      </div>
    </>
  );
}
