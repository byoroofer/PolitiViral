"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildLoginStatusHref } from "@/lib/auth/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type ResetPasswordFormProps = {
  initialErrorMessage?: string | null;
  initialStatusMessage?: string | null;
};

export function ResetPasswordForm({
  initialErrorMessage = null,
  initialStatusMessage = null,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
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
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password.length < 8) {
      setErrorMessage("Use at least 8 characters for your new password.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The password confirmation does not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      router.push(
        buildLoginStatusHref(
          "Your password has been updated. Log in with your new password.",
        ),
      );
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not update your password right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-7">
        <div className="space-y-4">
          <span className="eyebrow-pill">Choose a new password</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Finish password recovery
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Set a new password for your PolitiViral account to complete the recovery flow.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="field-label" htmlFor="reset-password">
              New password
            </label>
            <input
              autoComplete="new-password"
              className="field-input"
              id="reset-password"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label" htmlFor="reset-password-confirmation">
              Confirm new password
            </label>
            <input
              autoComplete="new-password"
              className="field-input"
              id="reset-password-confirmation"
              minLength={8}
              name="confirmPassword"
              placeholder="Repeat the new password"
              required
              type="password"
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
            {isSubmitting ? "Updating password..." : "Update password"}
          </Button>
        </form>
      </div>
    </SurfaceCard>
  );
}
