import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const locales = ["ar", "en"];
const defaultLocale = "en";

const privatePath = ["my-account", "wallet", "top-up", "home"];

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const token = request.cookies.get("token")?.value;

  const isPrivatePath = privatePath.some((path) => pathname.includes(path));
  const isAuthPath = pathname.includes("auth");

  if (isPrivatePath && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/" + defaultLocale;
    return NextResponse.redirect(url);
  } else if (isAuthPath && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/" + defaultLocale + "home";
    return NextResponse.redirect(url);
  }

  let lang = pathname.split("/")[1];
  if (!lang) lang = defaultLocale;

  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
