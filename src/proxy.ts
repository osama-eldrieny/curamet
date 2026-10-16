import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  // bare /en or /sv forwards to Theme 1 (the site only has three themes)
  const bare = locales.find((l) => pathname === `/${l}` || pathname === `/${l}/`);
  if (bare) {
    const url = request.nextUrl.clone();
    url.pathname = `/${bare}/theme-1`;
    return NextResponse.redirect(url);
  }
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "/theme-1" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|brand|clients|team|api|.*\\..*).*)"],
};
