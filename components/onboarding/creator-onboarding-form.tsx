"use client";

import { useActionState } from "react";

import { saveCreatorOnboardingAction } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { CreatorProfileRow } from "@/lib/data/user-context";
import { initialActionState } from "@/lib/forms/action-state";

type CreatorOnboardingFormProps = {
  initialValues: CreatorProfileRow | null;
};

export function CreatorOnboardingForm({ initialValues }: CreatorOnboardingFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveCreatorOnboardingAction,
    initialActionState,
  );

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="eyebrow-pill">Creator onboarding</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Set up your creator profile
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Keep this sharp and specific so campaigns can quickly understand your platform, voice, and political content fit.
            </p>
          </div>
        </div>

        <form action={formAction} className="grid gap-8">
          <div className="grid gap-6 rounded-[28px] border border-slate-200/75 bg-white/72 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Core identity</h2>
              <p className="field-help">The first details campaigns scan when deciding who fits the work.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="field-label" htmlFor="display-name">
                  Display name
                </label>
                <input
                  className="field-input"
                  defaultValue={initialValues?.display_name ?? ""}
                  id="display-name"
                  name="displayName"
                  placeholder="Jordan Fields"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="primary-platform">
                  Primary platform
                </label>
                <input
                  className="field-input"
                  defaultValue={initialValues?.primary_platform ?? ""}
                  id="primary-platform"
                  name="primaryPlatform"
                  placeholder="TikTok, Instagram Reels, X video"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="home-base">
                  Home base
                </label>
                <input
                  className="field-input"
                  defaultValue={initialValues?.home_base ?? ""}
                  id="home-base"
                  name="homeBase"
                  placeholder="Chicago, IL"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="audience-size">
                  Audience size
                </label>
                <input
                  className="field-input"
                  defaultValue={initialValues?.audience_size ?? ""}
                  id="audience-size"
                  name="audienceSize"
                  placeholder="10k-50k"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[28px] border border-slate-200/75 bg-white/72 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Content fit</h2>
              <p className="field-help">Describe the kind of political work you are strongest at.</p>
            </div>

            <div className="space-y-2">
              <label className="field-label" htmlFor="content-focus">
                Content focus
              </label>
              <input
                className="field-input"
                defaultValue={initialValues?.content_focus ?? ""}
                id="content-focus"
                name="contentFocus"
                placeholder="Politics, culture, issue explainers, reactions"
                required
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="field-label" htmlFor="bio">
                Short bio
              </label>
              <textarea
                className="field-textarea"
                defaultValue={initialValues?.bio ?? ""}
                id="bio"
                name="bio"
                placeholder="Give campaigns a concise sense of your voice, your audience, and the kind of political work you want to do."
                required
              />
            </div>
          </div>

          {state.error ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
              {state.error}
            </p>
          ) : null}

          <Button className="w-full sm:w-auto" disabled={isPending} size="lg" type="submit">
            {isPending ? "Saving creator profile..." : "Complete creator onboarding"}
          </Button>
        </form>
      </div>
    </SurfaceCard>
  );
}
