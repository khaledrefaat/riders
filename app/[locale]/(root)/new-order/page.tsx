import ReviewForm from "./components/ReviewForm";
import SenderRecipientForm from "./components/SenderRecipientForm";
import Steps from "./components/Steps";
import Payment from "./components/Payment";
import BackButton from "@/components/common/BackButton";
import MainContainer from "@/components/layout/MainContainer";
import { Locale } from "@/types";
import { getGovs } from "@/services/order-services";
import { getLocale } from "next-intl/server";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ step: string }>;
}) {
  const params = await searchParams;
  const step = params.step || "1";
  const locale = (await getLocale()) as Locale;

  const govs = await getGovs(locale);

  function renderStep() {
    switch (step) {
      case "1":
        return <SenderRecipientForm sender={true} govs={govs.data} />;
      case "2":
        return <SenderRecipientForm sender={false} govs={govs.data} />;
      case "3":
        return <ReviewForm />;
      case "4":
        return <Payment />;
      default:
        return <SenderRecipientForm sender={true} govs={govs.data} />;
    }
  }

  return (
    <MainContainer>
      <div className="w-full md:w-xl bg-white py-8 mx-auto md:my-20 rounded-[10px] overflow-hidden">
        <Steps activeStep={Number(step)} />
        {renderStep()}
      </div>

      <BackButton />
    </MainContainer>
  );
}
