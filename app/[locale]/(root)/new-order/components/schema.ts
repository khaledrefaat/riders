import { kwPhoneRegex } from "@/constants";
import {
  FirstStepSchemaDictionary,
  reviewSchemaDictionary,
  WhenToDeliver,
  WhoWillPay,
} from "@/types/ordersTypes";
import { z } from "zod";

export function firstStepSchema(dictionary: FirstStepSchemaDictionary) {
  z.setErrorMap(() => ({ message: dictionary.defaultError }));
  return z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    phone: z
      .string()
      .min(8, dictionary.phone)
      .max(8, dictionary.phone)
      .refine((value) => kwPhoneRegex.test(value), dictionary.phone),
    title_of_the_address: z.string().optional(),
    governorate_id: z.number().min(0),
    area_id: z.number().min(0),
    block_id: z.number().min(0),
    street_id: z.number().min(0),
    house: z.string().min(1),
    avenue: z.string().optional(),
    notes: z.string().optional(),
    save_address: z.boolean().optional(),
  });
}
export function reviewSchema(dictionary: reviewSchemaDictionary) {
  z.setErrorMap(() => ({ message: dictionary.defaultError }));
  return z.object({
    sender_name: z.string().min(1, dictionary.sender_name),
    sender_phone: z
      .string()
      .min(8, dictionary.sender_phone)
      .max(8, dictionary.sender_phone)
      .refine((value) => kwPhoneRegex.test(value), dictionary.sender_phone),
    sender_governorate: z.string().min(1, dictionary.sender_governorate),
    sender_area: z.string().min(1, dictionary.sender_area),
    sender_block: z.string().min(1, dictionary.sender_block),
    sender_street: z.string().min(1, dictionary.sender_street),
    sender_house: z.string().min(1, dictionary.sender_house),
    sender_avenue: z.string().optional(),
    recipient_name: z.string().min(1, dictionary.recipient_name),
    recipient_phone: z
      .string()
      .min(8, dictionary.recipient_phone)
      .max(8, dictionary.recipient_phone)
      .refine((value) => kwPhoneRegex.test(value), dictionary.recipient_phone),
    recipient_governorate: z.string().min(1, dictionary.recipient_governorate),
    recipient_area: z.string().min(1, dictionary.recipient_area),
    recipient_block: z.string().min(1, dictionary.recipient_block),
    recipient_street: z.string().min(1, dictionary.recipient_street),
    recipient_house: z.string().min(1, dictionary.recipient_house),
    recipient_avenue: z.string().optional(),
  });
}

export const orderSchema = z.object({
  who_pays: z.nativeEnum(WhoWillPay).default(WhoWillPay.SENDER),
  when_to_deliver: z.nativeEnum(WhenToDeliver).default(WhenToDeliver.NOW),
});
