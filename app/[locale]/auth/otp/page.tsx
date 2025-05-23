import Image from "next/image";
import FormData from "./components/FormData";
import { getTranslations } from "next-intl/server";

export default async function page() {
  // You can fetch any server-side data here
  const t = await getTranslations("auth");

  return (
    <div className="mt-14 bg-white flex-1 md:w-1/2 md:mx-auto md:rounded-[20px] md:flex-none md:max-w-2xl p-6">
      <h1 className="text-2xl md:text-[40px] text-primary  text-center md:mt-0">
        {t("OTP")}
      </h1>

      <div className="flex justify-center my-6">
        <Image
          src="/message-icon.png"
          alt="Message Icon"
          height={118}
          width={122}
          className="mx-auto h-[118px] w-[122px] object-contain"
        />
      </div>

      <p className="text-xl  text-center mt-4">{t("checkWhatsapp")} </p>

      <div className="flex items-center gap-2 justify-center rtl:flex-row-reverse mt-2">
        <Image
          src="/Kuwait-Flag.png"
          alt="Kuwait Flag"
          height={24}
          width={24}
          className="object-contain"
        />
        <p className="text-lg " dir="ltr">
          +965 50111233
        </p>
      </div>

      <p className="text-center mt-4 text-gray-500 ">{t("didntGetCode")}</p>

      <FormData />

      <p className="text-center mt-5 text-gray-500 ">{t("pleaseWait")}</p>
    </div>
  );
}
