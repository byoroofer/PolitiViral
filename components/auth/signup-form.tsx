"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildAuthCallbackUrl, buildAuthPageHref } from "@/lib/auth/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { Database } from "@/types/database";

type SignupFormProps = {
  loginRedirectPath: string;
  postSignupPath: string;
};

export function SignupForm({ loginRedirectPath, postSignupPath }: SignupFormProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const profilesTable = supabase.from("profiles") as any;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const emailRedirectTo = buildAuthCallbackUrl(window.location.origin, postSignupPath);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: fullName ? { full_name: fullName } : undefined,
          emailRedirectTo,
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const profilePayload: Database["public"]["Tables"]["profiles"]["Insert"] = {
          id: data.user.id,
          ...(fullName ? { full_name: fullName } : {}),
        };

        await profilesTable.upsert(profilePayload, {
          onConflict: "id",
        });
      }

      if (data.session) {
        router.push(postSignupPath);
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Account created. Check your inbox, confirm your email, and we will bring you back to role selection.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "We couldn't create your account right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-7">
        <div className="space-y-4">
          <span className="eyebrow-pill">Create your account</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Join PolitiViral
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Start with account creation, then choose whether you are joining as a creator or with a campaign team.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="field-label" htmlFor="signup-full-name">
              Full name
            </label>
            <input
              autoComplete="name"
              className="field-input"
              id="signup-full-name"
              name="fullName"
              placeholder="Your name"
              required
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label" htmlFor="signup-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="field-input"
              id="signup-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="field-label" htmlFor="signup-password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className="field-input"
              id="signup-password"
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

          {successMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="grid gap-4 rounded-[24px] border border-slate-200/75 bg-white/72 px-5 py-5">
          <div className="grid gap-2 text-sm leading-7 text-slate-600">
            <p>
              1. Create your account.
            </p>
            <p>
              2. Choose creator or campaign.
            </p>
            <p>
              3. Complete the onboarding flow built for your role.
            </p>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-blue-700"
              href={buildAuthPageHref("/login", loginRedirectPath)}
            >
              Log in instead
            </Link>
            .
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}
