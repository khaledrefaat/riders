import {
  DeliveryPayload,
  DeliveryStore,
  PaymentInfo,
} from "@/types/ordersTypes";

export function transformDeliveryStore(
  data: DeliveryStore,
  paymentInfo: PaymentInfo
): DeliveryPayload {
  const {
    sender_info: {
      sender_name_first,
      sender_name_last,
      sender_phone,
      pickup_address,
    },
    recipient_info: {
      recipient_name_first,
      recipient_name_last,
      recipient_phone,
      delivery_address,
    },
  } = data;

  const {
    payer,
    payment_method,
    delivery_price,
    terms_accepted,
    hide_sender,
    schedule_date,
    coupon,
  } = paymentInfo;

  return {
    sender_name_first,
    sender_name_last,
    sender_phone,

    recipient_name_first,
    recipient_name_last,
    recipient_phone,

    payer,
    payment_method,
    delivery_price,
    terms_accepted,
    hide_sender,
    schedule_date,
    coupon,

    pickup_address,
    delivery_address,
  };
}
