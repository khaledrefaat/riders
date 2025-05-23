import { Locale } from "@/types";

import { api, getHeaders } from "./ky-setup";
import { extractErrorMessages } from "@/lib/getRequestError";
import { WalletResponse } from "@/types/walletTypes";

export const getWallet = async (
  token: string,
  locale: Locale
): Promise<WalletResponse> => {
  try {
    return await api
      .get("wallet", {
        headers: getHeaders(locale, token),
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};
