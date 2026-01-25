import { NextRequest, NextResponse } from "next/server";
import {
  VIP_18_COOKIE_NAME,
  VIP_18_COOKIE_ALLOWED_VALUE,
  VIP_18_COOKIE_DENIED_VALUE,
  VIP_QUERY_PARAM_DENIED,
  VIP_QUERY_PARAM_VERIFY,
} from "@/lib/constants/vip";
import {
  IS_SENT_COOKIE_NAME,
  IS_SENT_COOKIE_VALUE,
  IS_SENT_REDIRECT_URL,
} from "@/lib/constants/safety";

export function middleware(request: NextRequest) {
  const isSentCookieValue = request.cookies.get(IS_SENT_COOKIE_NAME)?.value;
  if (isSentCookieValue === IS_SENT_COOKIE_VALUE) {
    return NextResponse.redirect(new URL(IS_SENT_REDIRECT_URL));
  }

  // Only protect VIP routes with the age gate.
  if (!request.nextUrl.pathname.startsWith("/vip")) {
    return NextResponse.next();
  }

  const vipCookieValue = request.cookies.get(VIP_18_COOKIE_NAME)?.value;

  if (vipCookieValue === VIP_18_COOKIE_ALLOWED_VALUE) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set(
    "vip",
    vipCookieValue === VIP_18_COOKIE_DENIED_VALUE ? VIP_QUERY_PARAM_DENIED : VIP_QUERY_PARAM_VERIFY
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

