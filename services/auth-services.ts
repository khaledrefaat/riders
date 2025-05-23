import { Locale } from "@/types";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
  VerifyOtpData,
  RequestPasswordResetData,
  LoginResponse,
  RegisterResponse,
  VerifyOtpResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
  getUserResponse,
} from "@/types/auth-requests-types";
import { api, getHeaders } from "./ky-setup";
import { extractErrorMessages } from "@/lib/getRequestError";

export const login = async (
  data: LoginData,
  locale: Locale
): Promise<LoginResponse> => {
  try {
    return await api
      .post("auth/login", {
        headers: getHeaders(locale),
        json: data,
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const status = err?.response?.status;

    if (status == 403) window.location.href = `/auth/otp?phone=${data.phone}`;
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const register = async (
  data: RegisterData,
  locale: Locale
): Promise<RegisterResponse> => {
  try {
    return await api
      .post("auth/register", {
        headers: getHeaders(locale),
        json: data,
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const resetPassword = async (
  data: ResetPasswordData,
  locale: Locale
): Promise<ResetPasswordResponse> => {
  try {
    return await api
      .post("auth/reset-password", {
        headers: getHeaders(locale),
        json: data,
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const verifyOtp = async (
  data: VerifyOtpData,
  locale: Locale
): Promise<VerifyOtpResponse> => {
  try {
    return await api
      .post("auth/verify-otp", {
        headers: getHeaders(locale),
        json: data,
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const requestPasswordReset = async (
  data: RequestPasswordResetData,
  locale: Locale
): Promise<RequestPasswordResetResponse> => {
  try {
    return await api
      .post("auth/request-password-reset", {
        headers: getHeaders(locale),
        json: data,
      })
      .json();
  } catch (err) {
    // @ts-expect-error error
    const error = extractErrorMessages(await err.response.json());
    // @ts-expect-error error
    throw new Error(error);
  }
};

export const logout = async (
  token: string,
  locale: Locale
): Promise<RequestPasswordResetResponse> => {
  try {
    return await api
      .post("auth/logout", {
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

export const getUser = async (locale: Locale): Promise<getUserResponse> => {
  try {
    return await api
      .get("auth/user", {
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
