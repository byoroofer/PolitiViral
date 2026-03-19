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

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300";

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
        "Account created. Check your inbox, confirm your email, and we'll bring you back to role selection.",
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
    <SurfaceCard className="p-8 sm:p-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
            Create your account
          </span>
          <div className="space-y-2">
            <h1 className="display-font text-4xl leading-none text-slate-950">Join PolitiViral</h1>
            <p className="text-base leading-7 text-slate-600">
              Start with an account, then choose whether you are joining as a creator or with a campaign team.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="signup-full-name">
              Full name
            </label>
            <input
              autoComplete="name"
              className={inputClassName}
              id="signup-full-name"
              name="fullName"
              placeholder="Your name"
              required
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="signup-email">
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClassName}
              id="signup-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="signup-password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className={inputClassName}
              id="signup-password"
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

          {successMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-slate-600">
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
    </SurfaceCard>
  );
}
