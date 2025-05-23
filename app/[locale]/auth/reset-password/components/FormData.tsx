"use client";

import { resetPasswordSchemaDictionary } from "@/types/authTypes";
import { useLocale, useTranslations } from "next-intl";
import { resetPasswordSchema } from "../../components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormItem from "@/components/common/FormItem";
import CustomButton from "@/components/common/CustomButton";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import { Locale } from "@/types";
import { requestPasswordReset } from "@/services/auth-services";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

export default function FormData() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();

  const dictionary: resetPasswordSchemaDictionary = {
    phone: t("formSchema.phone"),
    defaultError: t("formSchema.defaultError"),
  };

  const schema = resetPasswordSchema(dictionary);

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelLogin(data: z.infer<typeof schema>) {
    setIsSubmitting(true);
    try {
      const response = await requestPasswordReset(
        { phone: data.phone },
        locale
      );
      if (response.success) {
        toast.success(response.message);
        router.push(`/auth/change-password?phone=${data.phone}`);
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

        <CustomButton
          type="submit"
          className="w-full mt-8 mb-6 h-12 text-lg "
          disabled={isSubmitting}
        >
          {t("auth.resetPassword")}
        </CustomButton>
      </form>
    </Form>
  );
}
