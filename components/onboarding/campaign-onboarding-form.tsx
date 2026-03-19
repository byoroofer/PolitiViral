"use client";

import { useActionState } from "react";

import { saveCampaignOnboardingAction } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { CampaignProfileRow, OrganizationRow } from "@/lib/data/user-context";
import { initialActionState } from "@/lib/forms/action-state";

type CampaignOnboardingFormProps = {
  campaignProfile: CampaignProfileRow | null;
  organization: OrganizationRow | null;
};

export function CampaignOnboardingForm({
  campaignProfile,
  organization,
}: CampaignOnboardingFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveCampaignOnboardingAction,
    initialActionState,
  );

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="eyebrow-pill">Campaign onboarding</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Set up your campaign workspace
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Capture the operating basics so your team can start planning creator work with more confidence and less chaos.
            </p>
          </div>
        </div>

        <form action={formAction} className="grid gap-8">
          <div className="grid gap-6 rounded-[28px] border border-slate-200/75 bg-white/72 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Organization details
              </h2>
              <p className="field-help">Define who is running the program and what kind of political entity it is.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="field-label" htmlFor="organization-name">
                  Organization name
                </label>
                <input
                  className="field-input"
                  defaultValue={organization?.name ?? ""}
                  id="organization-name"
                  name="organizationName"
                  placeholder="Friends of ..."
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="organization-type">
                  Organization type
                </label>
                <input
                  className="field-input"
                  defaultValue={organization?.organization_type ?? ""}
                  id="organization-type"
                  name="organizationType"
                  placeholder="Candidate campaign, PAC, advocacy group"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="field-label" htmlFor="website-url">
                  Website URL
                </label>
                <input
                  className="field-input"
                  defaultValue={organization?.website_url ?? ""}
                  id="website-url"
                  name="websiteUrl"
                  placeholder="https://example.com"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[28px] border border-slate-200/75 bg-white/72 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Program setup</h2>
              <p className="field-help">Describe the initiative, market, budget range, and launch timing.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="field-label" htmlFor="campaign-name">
                  Campaign or initiative name
                </label>
                <input
                  className="field-input"
                  defaultValue={campaignProfile?.campaign_name ?? ""}
                  id="campaign-name"
                  name="campaignName"
                  placeholder="2026 persuasion program"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="geography-focus">
                  Geography focus
                </label>
                <input
                  className="field-input"
                  defaultValue={campaignProfile?.geography_focus ?? ""}
                  id="geography-focus"
                  name="geographyFocus"
                  placeholder="Michigan statewide"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="creator-budget">
                  Creator budget range
                </label>
                <input
                  className="field-input"
                  defaultValue={campaignProfile?.creator_budget ?? ""}
                  id="creator-budget"
                  name="creatorBudget"
                  placeholder="$5k-$15k pilot"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="field-label" htmlFor="launch-timeline">
                  Launch timeline
                </label>
                <input
                  className="field-input"
                  defaultValue={campaignProfile?.launch_timeline ?? ""}
                  id="launch-timeline"
                  name="launchTimeline"
                  placeholder="Within 3 weeks"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[28px] border border-slate-200/75 bg-white/72 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Activation goal
              </h2>
              <p className="field-help">Explain what creators need to help the campaign achieve.</p>
            </div>

            <div className="space-y-2">
              <label className="field-label" htmlFor="creator-goal">
                Creator goal
              </label>
              <textarea
                className="field-textarea"
                defaultValue={campaignProfile?.creator_goal ?? ""}
                id="creator-goal"
                name="creatorGoal"
                placeholder="Describe what you need creators to help achieve, from persuasion content to interview clips or merch and action pushes."
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
            {isPending ? "Saving campaign profile..." : "Complete campaign onboarding"}
          </Button>
        </form>
      </div>
    </SurfaceCard>
  );
}
