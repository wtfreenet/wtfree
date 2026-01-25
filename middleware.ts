import { NextRequest, NextResponse } from "next/server";
import {
  VIP_18_COOKIE_NAME,
  VIP_18_COOKIE_ALLOWED_VALUE,
  VIP_18_COOKIE_DENIED_VALUE,
  VIP_QUERY_PARAM_DENIED,
  VIP_QUERY_PARAM_VERIFY,
} from "@/lib/constants/vip";

export function middleware(request: NextRequest) {
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
  matcher: ["/vip/:path*"],
};

