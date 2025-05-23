import React from "react";
import { cn } from "@/lib/utils"; // shadcn utility for className concatenation
import { getTranslations } from "next-intl/server";

interface Props {
  activeStep: number;
}

export default async function OrderSteps({ activeStep }: Props) {
  const t = await getTranslations("orders");
  const steps = [
    { number: 1, title: t("pickup") },
    { number: 2, title: t("delivery") },
    { number: 3, title: t("review") },
    { number: 4, title: t("payment") },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 md:mb-10 px-10 md:px-6">
      <h3 className="text-2xl text-primary text-center ltr:md:text-left rtl:md:text-right">
        Step {activeStep}: {steps[activeStep - 1].title}
      </h3>
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] gap-y-3 items-center md:gap-x-1 mt-8">
        {/* First row: Numbers and sticks */}
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex justify-center">
              <div
                className={cn(
                  "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg ",
                  activeStep === step.number
                    ? "bg-primary text-white"
                    : activeStep > step.number
                    ? "bg-secondary text-white"
                    : "bg-customGray-500 text-[#C9C9C9]"
                )}
              >
                {step.number}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[3px] md:h-1 rounded-full w-full",
                  activeStep === step.number
                    ? "bg-primary"
                    : activeStep > step.number
                    ? "bg-secondary"
                    : "bg-[#C9C9C9]"
                )}
              />
            )}
          </React.Fragment>
        ))}
        {/* Second row: Titles */}
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex justify-center">
              <span
                className={cn(
                  "text-sm md:text-lg ",
                  activeStep === step.number
                    ? "text-primary"
                    : activeStep > step.number
                    ? "text-secondary"
                    : "text-[#C9C9C9]"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && <div />}{" "}
            {/* Empty cell for stick column */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
