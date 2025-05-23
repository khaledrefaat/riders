import CustomButton from "@/components/common/CustomButton";
import Separator from "@/components/common/Separator";
import EditProfileIcon from "@/components/icons/EditProfileIcon";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import WalletIcon from "@/components/icons/WalletIcon";
import LocationPinIcon from "@/components/icons/LocationPinIcon";
import OutlineFormIcon from "@/components/icons/OutlineFormIcon";
import BagIcon from "@/components/icons/BagIcon";
import FileIcon from "@/components/icons/FileIcon";
import HeadPhoneIcon from "@/components/icons/HeadPhoneIcon";
import ProfileItem from "@/components/common/ProfileItem";
import MainContainer from "@/components/layout/MainContainer";
import LanguageIcon from "@/components/icons/LanguageIcon";
import { Locale } from "@/types";
import LogoutButton from "@/components/common/LogoutButton";

export default async function page() {
  const t = await getTranslations("myAccount");
  const locale = (await getLocale()) as Locale;

  const name = "Husain Al Saffar";
  const phone = "+965 50100432";

  return (
    <MainContainer>
      <div className="bg-white md:bg-customGray-500 pt-8 md:pt-[90px]">
        <div className="bg-white flex-1 mx-auto md:rounded-[20px] xl:max-w-xl px-10 py-8 md:p-10">
          <h3 className="text-xl">{name}</h3>
          <div className="flex-row-between">
            <p className="text-lg">{phone}</p>
            <Link href="/my-account/edit">
              <CustomButton className="gap-x-2 min-w-24" size="sm">
                <EditProfileIcon />
                {t("edit")}
              </CustomButton>
            </Link>
          </div>
          <Separator className="h-[6px] mt-4 mb-6 md:mb-2" />
          <ProfileItem
            title={t("orders")}
            Icon={OutlineFormIcon}
            href="/my-account/orders"
          />
          <ProfileItem title={t("wallet")} Icon={WalletIcon} href="/wallet" />
          <ProfileItem
            title={t("address")}
            Icon={LocationPinIcon}
            href="/my-account/address"
          />
          <ProfileItem
            title={t("privacyPolicy")}
            Icon={BagIcon}
            href="/my-account/privacy-policy"
            desktopHidden
          />
          <ProfileItem
            title={t("termsAndConditions")}
            Icon={FileIcon}
            href="/my-account/terms-and-conditions"
            desktopHidden
          />
          <ProfileItem
            title={locale === "ar" ? "English" : "عربي"}
            Icon={LanguageIcon}
            href={"/my-account"}
            desktopHidden
            language={locale === "ar" ? "en" : "ar"}
          />
          <ProfileItem title={t("support")} Icon={HeadPhoneIcon} desktopHidden>
            <div className="flex flex-col gap-y-2 ltr:pl-6 rtl:pr-6 mt-3 ltr:text-lg">
              <Link href="mailto:support@tryriders.com">
                {t("email")}:{" "}
                <span className="underline">support@tryriders.com</span>
              </Link>
              <Link href="tel:+9651880999">
                {t("callCenterNumber")}:{" "}
                <span className="underline">1880999</span>
              </Link>
            </div>
          </ProfileItem>
          <LogoutButton />
        </div>
      </div>
    </MainContainer>
  );
}
