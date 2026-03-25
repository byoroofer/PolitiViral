"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildAuthCallbackUrl } from "@/lib/auth/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type MagicLinkRequestFormProps = {
  redirectPath: string;
};

export function MagicLinkRequestForm({ redirectPath }: MagicLinkRequestFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    try {
      const supabase = createBrowserSupabaseClient();
      const emailRedirectTo = buildAuthCallbackUrl(window.location.origin, redirectPath);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Magic link sent. Look for a branded PolitiViral email in your inbox and use that link to finish signing in.",
      );
      event.currentTarget.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send a magic link right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SurfaceCard className="p-6 sm:p-7" variant="tint">
      <div className="space-y-5">
        <div className="space-y-2">
          <span className="eyebrow-pill">Magic link</span>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Email me a sign-in link
          </h2>
          <p className="text-sm leading-7 text-slate-600">
            Use a one-time PolitiViral email link instead of a password.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="field-label" htmlFor="magic-link-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="field-input"
              id="magic-link-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="md" type="submit" variant="secondary">
            {isSubmitting ? "Sending link..." : "Send magic link"}
          </Button>
        </form>
      </div>
    </SurfaceCard>
  );
}
