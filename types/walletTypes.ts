export interface WalletResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    name: string;
    balance: string; // Kept as string since "0.000" is a string in the JSON
    decimal_places: number;
    meta: []; // Use `unknown[]` or a specific type if you know the structure of meta
  };
}
