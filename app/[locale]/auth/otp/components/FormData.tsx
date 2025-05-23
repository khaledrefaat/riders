"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormControl, FormItem, FormMessage, Form } from "@/components/ui/form";
import { cn, formatTimer } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import toast from "react-hot-toast";
import { verifyOtp } from "@/services/auth-services";
import { Locale } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import Loading from "@/components/common/Loading";
import { useAuthStore } from "@/store/auth-store";

export default function FormData() {
  const t = useTranslations();
  const [timer, setTimer] = useState(30);
  const [otpHasBeenSent, setOtpHasBeenSent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const locale = useLocale() as Locale;
  const phone = useSearchParams().get("phone");
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuthentication);

  // Create schema with otp validation
  const schema = z.object({
    otp: z.string().min(4, t("formSchema.otp")).max(4, t("formSchema.otp")),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!phone) {
      toast.error("Invalid phone number");
      router.replace("/auth/login");
    }
  }, [phone, router]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      setLoading(true);
      try {
        const res = await verifyOtp({ phone: phone!, otp: data.otp }, locale);
        if (res.success) {
          setAuth(true, res.data.token, res.data.customer);
          router.replace("/home");
        }
      } catch (err: unknown) {
        toast.error((err as Error).message);
        setError(
          "Invalid password from SMS.\nCheck the correctness of the entered password and try again"
        );
      } finally {
        setLoading(false);
      }

      setTimeout(() => {
        setError(null);
      }, 5000);
      // Handle OTP verification logic here
    },
    [locale, phone, router, setAuth]
  );

  const handleResend = useCallback(() => {
    // Function body...
    setOtpHasBeenSent(true);
    setTimer(30);
  }, []);

  const otpValue = form.watch("otp");

  useEffect(() => {
    if (timer === 0 && otpHasBeenSent) {
      setOtpHasBeenSent(false);
    }
  }, [timer, otpHasBeenSent]);

  // Dedicated effect for the countdown timer
  useEffect(() => {
    // Only start a timer if it's greater than 0 and OTP has been sent
    if (timer > 0 && otpHasBeenSent) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => Math.max(0, prevTimer - 1));
      }, 1000);

      // Always provide a cleanup function
      return () => clearInterval(countdown);
    }

    // No timer needed in other cases
    return undefined;
  }, [otpHasBeenSent, timer]);

  useEffect(() => {
    if (otpValue && otpValue.length === 4) {
      form.handleSubmit(onSubmit)();
    }
  }, [otpValue, form, onSubmit]);

  return (
    <>
      <p className="text-center mt-2 text-gray-500 ">
        {t("auth.resend")} {t("auth.in")} {formatTimer(timer)}
      </p>
      {loading && <Loading />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col items-center gap-y-5"
          dir="ltr"
        >
          <FormItem>
            <FormControl>
              <Controller
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                    className="flex justify-center gap-4"
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot
                        index={0}
                        className={cn(
                          "h-14 w-14 text-3xl rounded-[10px] bg-customGray-400 data-[active=true]:ring-primary/50",
                          error && "border-destructive"
                        )}
                      />
                      <InputOTPSlot
                        index={1}
                        className={cn(
                          "h-14 w-14 text-3xl border-l rounded-[10px] bg-customGray-400 data-[active=true]:ring-primary/50",
                          error && "border-destructive"
                        )}
                      />
                      <InputOTPSlot
                        index={2}
                        className={cn(
                          "h-14 w-14 text-3xl border-l rounded-[10px] bg-customGray-400 data-[active=true]:ring-primary/50",
                          error && "border-destructive"
                        )}
                      />
                      <InputOTPSlot
                        index={3}
                        className={cn(
                          "h-14 w-14 text-3xl border-l rounded-[10px] bg-customGray-400 data-[active=true]:ring-primary/50",
                          error && "border-destructive"
                        )}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </FormControl>
            <FormMessage className="text-center mt-2" />
          </FormItem>
          {error && (
            <p className="text-center text-destructive max-w-2/3 mx-auto">
              {error}
            </p>
          )}
          {!otpHasBeenSent && timer < 1 && (
            <button
              onClick={handleResend}
              className="text-center mx-auto underline text-customGray-150  cursor-pointer"
              aria-label="Resend OTP"
            >
              {t("auth.resendOneTimePassword")}
            </button>
          )}
          {otpHasBeenSent && (
            <p className="text-center text-gray-500 ">
              {t("auth.otpHasBeenSent")}
            </p>
          )}
        </form>
      </Form>
    </>
  );
}
