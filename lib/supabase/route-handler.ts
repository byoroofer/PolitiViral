import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { NextResponse as MiddlewareResponse } from "next/server";

import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createRouteHandlerSupabaseClient(request: Request | NextRequest) {
  const requestHeaders = new Headers(request.headers);
  let response = MiddlewareResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient<Database>(
    getSupabaseUrl(),
    getSupabasePublicKey(),
    {
      cookies: {
        getAll() {
          if ("cookies" in request) {
            return request.cookies.getAll();
          }

          return [];
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            options: CookieOptions;
            value: string;
          }>,
        ) {
          if ("cookies" in request) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
          }

          response = MiddlewareResponse.next({
            request: {
              headers: requestHeaders,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return {
    applyCookies(targetResponse: NextResponse) {
      response.cookies.getAll().forEach((cookie) => {
        targetResponse.cookies.set(cookie);
      });

      return targetResponse;
    },
    supabase,
  };
}
