"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildResetPasswordUrl } from "@/lib/auth/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type PasswordRecoveryRequestFormProps = {
  initialErrorMessage?: string | null;
  initialStatusMessage?: string | null;
};

export function PasswordRecoveryRequestForm({
  initialErrorMessage = null,
  initialStatusMessage = null,
}: PasswordRecoveryRequestFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(initialErrorMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(initialStatusMessage);

  useEffect(() => {
    setErrorMessage(initialErrorMessage);
  }, [initialErrorMessage]);

  useEffect(() => {
    setStatusMessage(initialStatusMessage);
  }, [initialStatusMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    try {
      const supabase = createBrowserSupabaseClient();
      const redirectTo = buildResetPasswordUrl(window.location.origin);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      setStatusMessage(
        "Reset email sent. Look for the branded PolitiViral password reset email and use that link to choose a new password.",
      );
      event.currentTarget.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send a password reset email right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-7">
        <div className="space-y-4">
          <span className="eyebrow-pill">Password recovery</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Send a reset email
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Enter the email on your PolitiViral account and we will send a branded
              recovery email with a secure reset link.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="field-label" htmlFor="reset-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="field-input"
              id="reset-email"
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

          {statusMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
              {statusMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Sending reset email..." : "Send password reset"}
          </Button>
        </form>
      </div>
    </SurfaceCard>
  );
}
