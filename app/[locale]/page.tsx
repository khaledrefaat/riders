import Image from "next/image";
import AuthHeader from "@/components/layout/AuthHeader";
import IntroBox from "@/components/common/IntroBox";
import CustomButton from "@/components/common/CustomButton";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function page() {
  const t = await getTranslations("welcome");

  return (
    <>
      <main className="min-h-screen bg-white md:bg-customGray-500">
        <AuthHeader noBack />

        <div className="container mx-auto px-4 mt-28 md:mt-0 md:grid grid-cols-2 xl:grid-cols-[max-content_max-content] justify-center md:py-12 md:px-6 gap-x-14 xl:gap-x-20">
          {/* Left Side - IntroBox */}
          <IntroBox className="md:flex-1 w-full xl:w-xl md:col-start-2 md:row-start-1" />

          {/* Right Side - Main Content */}
          <div className="bg-white rounded-lg p-6 md:py-14 mt-10 md:mt-0 md:rounded-[20px] md:flex-1 w-full xl:w-xl relative">
            <div className="border border-gray-400 px-4 py-5 rounded-lg md:border-none ltr:pr-24 rtl:pl-24 ltr:md:pr-40 rtl:md:pl-40">
              <h1 className="text-primary text-3xl md:text-4xl ">
                {t("title")}
              </h1>
              <p className="text-customGray-150 text-sm md:text-lg  mt-4">
                {t("subtitle")}
              </p>
              <Link href="/auth/login">
                <CustomButton
                  variant="primary"
                  className="w-[160px] md:w-[255px] mt-7 md:mt-10 h-12 text-lg "
                >
                  {t("signIn")}
                </CustomButton>
              </Link>
            </div>

            {/* Bike image with responsive positioning */}
            <div className="absolute ltr:right-5 rtl:left-5 sm:ltr:right-10 sm:rtl:left-10 md:ltr:right-0 md:rtl:left-0 top-[40px] md:top-[50px]">
              <Image
                src="/bike.png"
                alt="Bike"
                width={120}
                height={120}
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain"
              />
            </div>

            <Link href="/new-order">
              <CustomButton
                variant="secondary"
                className="w-full mt-9 h-12 text-lg "
              >
                {t("continueAsGuest")}
              </CustomButton>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
