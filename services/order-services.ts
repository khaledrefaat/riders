import { Locale } from "@/types";

import { api, getHeaders } from "./ky-setup";
import { extractErrorMessages } from "@/lib/getRequestError";
import {
  AreaResponse,
  BlockResponse,
  GovernorateResponse,
} from "@/types/locationTypes";

export const getGovs = async (locale: Locale): Promise<GovernorateResponse> => {
  try {
    return await api
      .get("geo/govs", {
        headers: getHeaders(locale),
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const getAreas = async (
  id: number | string,
  locale: Locale
): Promise<AreaResponse> => {
  try {
    return await api
      .get("geo/areas?governorate_id=" + id, {
        headers: getHeaders(locale),
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const getBlocks = async (
  id: number | string,
  locale: Locale
): Promise<BlockResponse> => {
  try {
    return await api
      .get("geo/blocks?area_id=" + id, {
        headers: getHeaders(locale),
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const getStreets = async (
  id: number | string,
  locale: Locale
): Promise<BlockResponse> => {
  try {
    return await api
      .get("geo/streets?block_id=" + id, {
        headers: getHeaders(locale),
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};
