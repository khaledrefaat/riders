"use client";

import { kwPhoneRegex } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import FormItem from "@/components/common/FormItem";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/common/CustomButton";

export default function FormData() {
  const t = useTranslations();
  const schema = z.object({
    phone: z
      .string()
      .min(8, t("formSchema.phone"))
      .max(8, t("formSchema.phone"))
      .refine((value) => kwPhoneRegex.test(value), t("formSchema.phone")),
    last_name: z.string().min(1, t("formSchema.last_name")),
    first_name: z.string().min(1, t("formSchema.first_name")),
  });

  const registerForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function handelLogin(data: z.infer<typeof schema>) {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const inputBaseClass =
    "bg-customGray-400 placeholder:text-black placeholder:";

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(handelLogin)}>
        <div>
          <div className="flex flex-row justify-between gap-x-5">
            <FormField
              name="first_name"
              control={registerForm.control}
              render={({ field }) => (
                <FormItem
                  label={t("auth.firstName")}
                  type="text"
                  inputClassName={cn(
                    inputBaseClass,
                    field.value && "bg-primary text-white border-primary"
                  )}
                  {...field}
                />
              )}
            />
            <FormField
              name="last_name"
              control={registerForm.control}
              render={({ field }) => (
                <FormItem
                  label={t("auth.lastName")}
                  type="text"
                  inputClassName={cn(
                    inputBaseClass,
                    field.value && "bg-primary text-white border-primary"
                  )}
                  {...field}
                />
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
                inputClassName={cn(
                  inputBaseClass,
                  field.value && "bg-primary text-white border-primary"
                )}
                className="mt-6"
                {...field}
              />
            )}
          />

          <CustomButton
            type="submit"
            className="w-full mt-8"
            disabled={registerForm.formState.isSubmitting}
          >
            {t("auth.saveChanges")}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}
