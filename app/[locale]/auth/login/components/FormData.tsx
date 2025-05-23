"use client";

import { loginSchemaDictionary } from "@/types/authTypes";
import { useLocale, useTranslations } from "next-intl";
import { loginSchema } from "../../components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormItem from "@/components/common/FormItem";
import CustomButton from "@/components/common/CustomButton";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import toast from "react-hot-toast";
import { login } from "@/services/auth-services";
import { useRouter } from "@/i18n/routing";
import { Locale } from "@/types";
import { useAuthStore } from "@/store/auth-store";

export default function FormData() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuthentication);

  const dictionary: loginSchemaDictionary = {
    phone: t("formSchema.phone"),
    password: t("formSchema.password"),
    defaultError: t("formSchema.defaultError"),
  };

  const schema = loginSchema(dictionary);

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelLogin(data: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);
      const res = await login(data, locale);
      if (res.success) {
        setAuth(true, res.data.token, res.data.customer);
        toast.success(res.message);
        router.replace("/home");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handelLogin)}
        className="w-full mt-5"
      >
        {isSubmitting && <Loading />}
        <FormField
          name="phone"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem
              label={t("auth.phoneNumber")}
              type="phone"
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
              className="mt-5"
              {...field}
            />
          )}
        />

        <CustomButton
          type="submit"
          className="w-full mt-8 mb-6 h-12 text-lg "
          disabled={isSubmitting}
        >
          {isSubmitting ? t("auth.signIn") : t("auth.signIn")}
        </CustomButton>
      </form>
    </Form>
  );
}
