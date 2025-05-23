import {
  changePasswordSchemaDictionary,
  loginSchemaDictionary,
  resetPasswordSchemaDictionary,
  signupSchemaDictionary,
} from "@/types/authTypes.d";
import { z } from "zod";
import { kwPhoneRegex } from "@/constants";

export function signupSchema(dictionary: signupSchemaDictionary) {
  z.setErrorMap(() => ({ message: dictionary.defaultError }));
  return z
    .object({
      name: z.string().min(1, dictionary.name),
      phone: z
        .string()
        .min(8, dictionary.phone)
        .max(8, dictionary.phone)
        .refine((value) => kwPhoneRegex.test(value), dictionary.phone),
      password: z.string().min(6, dictionary.password),
      password_confirmation: z
        .string()
        .min(6, dictionary.password_confirmation),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: dictionary.passwords_not_match,
      path: ["password_confirmation"],
    });
}

export function loginSchema(dictionary: loginSchemaDictionary) {
  return z.object({
    phone: z
      .string()
      .min(8, dictionary.phone)
      .max(8, dictionary.phone)
      .refine((value) => kwPhoneRegex.test(value), dictionary.phone),
    password: z.string().min(6, dictionary.password),
  });
}

export function changePasswordSchema(
  dictionary: changePasswordSchemaDictionary
) {
  z.setErrorMap(() => ({ message: dictionary.defaultError }));
  return z
    .object({
      otp: z.string().min(1, dictionary.otp),
      password: z.string().min(6, dictionary.password),
      password_confirmation: z
        .string()
        .min(6, dictionary.password_confirmation),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: dictionary.passwords_not_match,
      path: ["password_confirmation"],
    });
}

export function resetPasswordSchema(dictionary: resetPasswordSchemaDictionary) {
  z.setErrorMap(() => ({ message: dictionary.defaultError }));
  return z.object({
    phone: z
      .string()
      .min(8, dictionary.phone)
      .max(8, dictionary.phone)
      .refine((value) => kwPhoneRegex.test(value), dictionary.phone),
  });
}
