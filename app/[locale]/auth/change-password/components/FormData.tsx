"use client";

import { changePasswordSchemaDictionary } from "@/types/authTypes";
import { useLocale, useTranslations } from "next-intl";
import { changePasswordSchema } from "../../components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormItem from "@/components/common/FormItem";
import CustomButton from "@/components/common/CustomButton";
import { useState } from "react";
import { Locale } from "@/types";
import { resetPassword } from "@/services/auth-services";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export default function FormData() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const phone = useSearchParams().get("phone");

  const dictionary: changePasswordSchemaDictionary = {
    otp: t("formSchema.otp"),
    password: t("formSchema.password"),
    password_confirmation: t("formSchema.password_confirmation"),
    passwords_not_match: t("formSchema.passwords_not_match"),
    defaultError: t("formSchema.defaultError"),
  };

  const schema = changePasswordSchema(dictionary);

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelChangePassword(data: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const res = await resetPassword({ phone: phone!, ...data }, locale);
      toast.success(res.message);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
      router.replace("/auth/login");
    }
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handelChangePassword)}
        className="w-full mt-5"
      >
        <FormField
          name="otp"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem
              label={t("auth.OTP")}
              type="number"
              className="mt-6"
              {...field}
            />
          )}
        />

        <FormField
          name="password"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem
              label={t("auth.password")}
              type="password"
              className="mt-6"
              {...field}
            />
          )}
        />

        <FormField
          name="password_confirmation"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem
              label={t("auth.password_confirmation")}
              type="password"
              className="mt-6"
              {...field}
            />
          )}
        />

        <CustomButton
          type="submit"
          className="w-full mt-8 mb-6 h-12 text-lg "
          disabled={isSubmitting}
        >
          {t("auth.changePassword")}
        </CustomButton>
      </form>
    </Form>
  );
}
