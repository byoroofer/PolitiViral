"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildAuthPageHref } from "@/lib/auth/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type LoginFormProps = {
  redirectPath: string;
};

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300";

export function LoginForm({ redirectPath }: LoginFormProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to log in right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SurfaceCard className="p-8 sm:p-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
            Welcome back
          </span>
          <div className="space-y-2">
            <h1 className="display-font text-4xl leading-none text-slate-950">Log in to PolitiViral</h1>
            <p className="text-base leading-7 text-slate-600">
              Return to your campaign or creator workspace and keep your political activation flow moving.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="login-email">
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClassName}
              id="login-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="login-password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className={inputClassName}
              id="login-password"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-sm text-slate-600">
          Need an account?{" "}
          <Link className="font-semibold text-blue-700" href={buildAuthPageHref("/signup", redirectPath)}>
            Sign up
          </Link>
          .
        </p>
      </div>
    </SurfaceCard>
  );
}
