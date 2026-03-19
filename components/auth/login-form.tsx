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
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-7">
        <div className="space-y-4">
          <span className="eyebrow-pill">Welcome back</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Log in to PolitiViral
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Return to your campaign or creator workspace and keep your political creator program moving with better structure.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="field-label" htmlFor="login-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="field-input"
              id="login-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="field-input"
              id="login-password"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
              {errorMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="rounded-[24px] border border-slate-200/75 bg-white/72 px-5 py-4">
          <p className="text-sm leading-7 text-slate-600">
            Need an account?{" "}
            <Link className="font-semibold text-blue-700" href={buildAuthPageHref("/signup", redirectPath)}>
              Sign up
            </Link>{" "}
            to start with role selection and onboarding.
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}
