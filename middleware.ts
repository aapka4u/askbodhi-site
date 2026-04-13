import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If the pathname already has a locale prefix, use next-intl middleware as-is
  if (routing.locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return intlMiddleware(request);
  }

  // For root path "/" only: apply geo-detection
  if (pathname === "/") {
    // Get visitor's country from Vercel header
    const countryCode = request.headers.get("x-vercel-ip-country") || null;

    // Check for NEXT_LOCALE cookie override
    const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

    let preferredLocale: "nl" | "en" = routing.defaultLocale;

    if (localeCookie && routing.locales.includes(localeCookie as any)) {
      preferredLocale = localeCookie as "nl" | "en";
    } else if (countryCode === "NL") {
      preferredLocale = "nl";
    } else if (countryCode === "BE") {
      // Belgium (Flemish region) → Dutch
      preferredLocale = "nl";
    } else {
      // All other countries → English
      preferredLocale = "en";
    }

    // Redirect to localized path
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  // For all other non-localized paths, apply next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except those starting with underscore or containing a dot
    "/((?!_next|.*\\..*|api).*)",
  ],
};
