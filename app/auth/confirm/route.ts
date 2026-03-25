import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import {
  buildLoginErrorHref,
  buildResetPasswordPageHref,
  getDefaultNextPathForEmailAction,
  getSafeRedirectPath,
} from "@/lib/auth/redirects";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route-handler";

const supportedEmailOtpTypes: EmailOtpType[] = [
  "email",
  "email_change",
  "invite",
  "magiclink",
  "recovery",
  "signup",
];

function isSupportedEmailOtpType(value: string | null): value is EmailOtpType {
  return value ? supportedEmailOtpTypes.includes(value as EmailOtpType) : false;
}

function buildAbsoluteRedirect(request: Request, pathname: string) {
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? requestUrl.protocol.replace(":", "");
  const host = forwardedHost ?? requestUrl.host;

  return `${protocol}://${host}${pathname}`;
}

function buildErrorRedirect(type: string | null, nextPath: string, message: string) {
  if (type === "recovery") {
    return buildResetPasswordPageHref({
      errorMessage: message,
      mode: "request",
    });
  }

  return buildLoginErrorHref(message, nextPath);
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const nextPath = getSafeRedirectPath(
    searchParams.get("next"),
    getDefaultNextPathForEmailAction(type),
  );

  if (!tokenHash || !isSupportedEmailOtpType(type)) {
    return NextResponse.redirect(
      buildAbsoluteRedirect(
        request,
        buildErrorRedirect(type, nextPath, "This verification link is invalid or expired."),
      ),
    );
  }

  const { applyCookies, supabase } = createRouteHandlerSupabaseClient(request);
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  });

  if (error) {
    return NextResponse.redirect(
      buildAbsoluteRedirect(
        request,
        buildErrorRedirect(
          type,
          nextPath,
          "We could not verify that email action. Please request a fresh link.",
        ),
      ),
    );
  }

  const redirectResponse = NextResponse.redirect(buildAbsoluteRedirect(request, nextPath));
  return applyCookies(redirectResponse);
}
