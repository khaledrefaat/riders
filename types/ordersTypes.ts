export interface FirstStepSchemaDictionary {
  defaultError: string;
  phone: string;
}

export interface reviewSchemaDictionary {
  defaultError: string;
  sender_name: string;
  sender_phone: string;
  sender_governorate: string;
  sender_area: string;
  sender_block: string;
  sender_street: string;
  sender_house: string;
  sender_avenue: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_governorate: string;
  recipient_area: string;
  recipient_block: string;
  recipient_street: string;
  recipient_house: string;
  recipient_avenue: string;
}

export enum BuildingType {
  HOUSE = "house",
  APARTMENT = "apartment",
  OFFICE = "office",
  STORE = "store",
}

export enum WhoWillPay {
  SENDER = "sender",
  RECIPIENT = "recipient",
}

export enum WhenToDeliver {
  NOW = "now",
  PRE_ORDER = "pre_order",
}

export enum ACTIVE_PAYMENT {
  CARD = "card",
  WALLET = "wallet",
  APPLE_PAY = "apple_pay",
  KNET = "knet",
}

export enum OrderStatus {
  DELIVERED = "delivered",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

export interface Address {
  coordinates: {
    lat: string;
    lng: string;
  };
  governorate_id: number;
  area_id: number;
  block_id: number;
  street_id: number;
  avenue: string;
  house: string;
  notes: string;
}

export interface SenderInfo {
  sender_name_first: string;
  sender_name_last: string;
  sender_phone: string;
  pickup_address: Address;
}

export interface RecipientInfo {
  recipient_name_first: string;
  recipient_name_last: string;
  recipient_phone: string;
  delivery_address: Address;
}

export interface PaymentInfo {
  payer: "sender" | "recipient";
  payment_method: "cash" | "card" | "online";
  delivery_price: number;
  terms_accepted: "on" | "off";
  hide_sender: "on" | "off";
  schedule_date: string;
  coupon: string;
}

export interface DeliveryStore {
  sender_info: SenderInfo;
  recipient_info: RecipientInfo;
  setSenderInfo: (senderInfo: Partial<SenderInfo>) => void;
  setRecipientInfo: (recipientInfo: Partial<RecipientInfo>) => void;
  reset: () => void;
  getSenderInfo: () => SenderInfo;
  getRecipientInfo: () => RecipientInfo;
}

export interface DeliveryPayload {
  sender_name_first: string;
  sender_name_last: string;
  sender_phone: string;

  recipient_name_first: string;
  recipient_name_last: string;
  recipient_phone: string;

  payer: PaymentInfo["payer"];
  payment_method: PaymentInfo["payment_method"];
  delivery_price: number;
  terms_accepted: PaymentInfo["terms_accepted"];
  hide_sender: PaymentInfo["hide_sender"];
  schedule_date: string;
  coupon: string;

  pickup_address: Address;
  delivery_address: Address;
}
