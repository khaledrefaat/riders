import { Locale } from "@/types";

export const getHeaders = (locale: Locale, token?: string) => ({
  "Accept-Language": locale,
  Accept: "application/json",
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

// ky-setup.ts
import ky from "ky";

// Build a pre-configured instance with your base URL, retry & timeout
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL, // or whatever your base path is
  timeout: 10_000, // 10s timeout
  retry: {
    limit: 2,
    methods: ["post"],
    statusCodes: [408, 500, 502, 503, 504],
  },
});
