import CustomButton from "@/components/common/CustomButton";
import NotFoundIcon from "@/components/icons/NotFoundIcon";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const NotFound: React.FC = async () => {
  const t = await getTranslations("navigation");

  return (
    // height = 596,
    // width = 665,
    <div className="min-h-screen w-[100vw] flex flex-col items-center md:justify-center gap-y-8 mt-10 md:mt-0">
      <NotFoundIcon />
      <Image
        src="/bike.png"
        alt="bike"
        width={330}
        height={260}
        className="object-contain h-[260px] md:h-[300px] -mt-10 md:mt-0 block"
      />
      <h2 className="text-[48px] text-center font-normal -mt-10 md:mt-0">
        {t("page")} <span className="font-semibold">{t("notFound")}</span>
      </h2>
      <Link href="/home">
        <CustomButton className="md:w-[480px] w-full">
          {t("backToHome")}
        </CustomButton>
      </Link>
    </div>
  );
};

export default NotFound;
