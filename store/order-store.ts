import { DeliveryStore } from "@/types/ordersTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Initial state
const initialState = {
  sender_info: {
    sender_name_first: "",
    sender_name_last: "",
    sender_phone: "",
    pickup_address: {
      coordinates: { lat: "", lng: "" },
      governorate_id: 0,
      area_id: 0,
      block_id: 0,
      street_id: 0,
      avenue: "",
      house: "",
      notes: "",
    },
  },
  recipient_info: {
    recipient_name_first: "",
    recipient_name_last: "",
    recipient_phone: "",
    delivery_address: {
      coordinates: { lat: "", lng: "" },
      governorate_id: 0,
      area_id: 0,
      block_id: 0,
      street_id: 0,
      avenue: "",
      house: "",
      notes: "",
    },
  },
};

// Create Zustand store
export const useDeliveryStore = create(
  persist<DeliveryStore>(
    (set, get) => ({
      ...initialState,
      setSenderInfo: (senderInfo) =>
        set((state) => ({
          sender_info: { ...state.sender_info, ...senderInfo },
        })),
      setRecipientInfo: (recipientInfo) =>
        set((state) => ({
          recipient_info: { ...state.recipient_info, ...recipientInfo },
        })),

      getSenderInfo: () => get().sender_info,
      getRecipientInfo: () => get().recipient_info,

      reset: () => set(initialState),
    }),
    {
      name: "delivery-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
