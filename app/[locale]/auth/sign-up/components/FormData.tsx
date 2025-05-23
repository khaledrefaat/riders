"use client";

import { signupSchemaDictionary } from "@/types/authTypes";
import { useLocale, useTranslations } from "next-intl";
import { signupSchema } from "../../components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormItem from "@/components/common/FormItem";
import CustomButton from "@/components/common/CustomButton";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import { register } from "@/services/auth-services";
import { Locale } from "@/types";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";

export default function FormData() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const router = useRouter();

  const dictionary: signupSchemaDictionary = {
    name: t("formSchema.name"),
    phone: t("formSchema.phone"),
    password: t("formSchema.password"),
    password_confirmation: t("formSchema.password_confirmation"),
    defaultError: t("formSchema.defaultError"),
    passwords_not_match: t("formSchema.passwords_not_match"),
  };

  const schema = signupSchema(dictionary);

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelRegister(data: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const res = await register(data, locale);
      toast.success(res.message);
      router.push(`/auth/otp?phone=${data.phone}`);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handelRegister)}
        className="w-full mt-5"
      >
        <div className="flex flex-row justify-between gap-x-5">
          <FormField
            name="name"
            control={registerForm.control}
            render={({ field }) => (
              <FormItem label={t("auth.name")} type="text" {...field} />
            )}
          />
        </div>

        <FormField
          name="phone"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem
              label={t("auth.phoneNumber")}
              type="phone"
              className="mt-6"
              autoComplete="on"
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
              className="mt-5"
              autoComplete="on"
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
              className="mt-5"
              autoComplete="on"
              {...field}
            />
          )}
        />

        <CustomButton
          type="submit"
          className="w-full mt-8 mb-6 h-12 text-lg "
          disabled={isSubmitting}
        >
          {isSubmitting ? t("auth.signingUp") : t("auth.signUp")}
        </CustomButton>
        {isSubmitting && <Loading />}
      </form>
    </Form>
  );
}
