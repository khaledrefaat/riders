"use client";

import CustomButton from "@/components/common/CustomButton";
import { Link } from "@/i18n/routing";
import { useAuthStore } from "@/store/auth-store";
import EditProfileIcon from "@/components/icons/EditProfileIcon";
import { useTranslations } from "next-intl";

export default function ProfileData() {
  const user = useAuthStore((state) => state.user);
  const t = useTranslations("myAccount");

  return (
    <>
      <h3 className="text-xl">{user?.name}</h3>
      <div className="flex-row-between">
        <p className="text-lg" dir="ltr">
          +{user?.country_code} {user?.phone}
        </p>
        <Link href="/my-account/edit">
          <CustomButton className="gap-x-2 min-w-24" size="sm">
            <EditProfileIcon />
            {t("edit")}
          </CustomButton>
        </Link>
      </div>
    </>
  );
}
