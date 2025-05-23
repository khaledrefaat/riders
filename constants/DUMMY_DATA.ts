import { WalletTransactionTypes } from "@/types";
import { OrderStatus } from "@/types/ordersTypes";

export const CURRENT_ORDER = {
  created_at: new Date(),
  amount: 1.25,
  from: "Salmiya",
  to: "Hawally",
  orderId: "1208201820318",
  status: OrderStatus.DELIVERED,
};

export const ORDER_LIST = [
  {
    created_at: new Date(),
    total: 1.25,
    from: "Salmiya",
    to: "Hawally",
    orderId: "1208201810318",
    status: OrderStatus.DELIVERED,
  },
  {
    created_at: new Date(),
    total: 1.25,
    from: "Salmiya",
    to: "Hawally",
    orderId: "1208211820318",
    status: OrderStatus.PENDING,
  },
  {
    created_at: new Date(),
    total: 1.25,
    from: "Salmiya",
    to: "Hawally",
    orderId: "1208101850318",
    status: OrderStatus.DELIVERED,
  },
];

export const WALLET_TRANSACTIONS = [
  {
    created_at: new Date(),
    amount: 5000,
    id: "1208201810318",
    status: WalletTransactionTypes.TOPUP,
  },
  {
    created_at: new Date(),
    amount: 5000,
    id: "1208211820318",
    status: WalletTransactionTypes.PAYMENT,
  },
  {
    created_at: new Date(),
    amount: 5000,
    id: "1208201810318",
    status: WalletTransactionTypes.TOPUP,
  },
  {
    created_at: new Date(),
    amount: 5000,
    id: "1208101850318",
    status: WalletTransactionTypes.REFUND,
  },
];
