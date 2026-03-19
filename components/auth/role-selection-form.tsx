"use client";

import { useActionState } from "react";

import { selectRoleAction } from "@/app/actions/profile";
import { SurfaceCard } from "@/components/ui/surface-card";
import { initialActionState } from "@/lib/forms/action-state";

const roleOptions = [
  {
    value: "creator",
    title: "I'm a creator",
    description:
      "Build a campaign-ready profile, show campaigns where your content fits, and manage future political partnerships from one cleaner workspace.",
    detail: "Best for political content makers across TikTok, Instagram, Facebook, Bluesky, and X.",
  },
  {
    value: "campaign",
    title: "I'm with a campaign",
    description:
      "Set up your creator program, organize briefs and goals, and give the team a more credible operating layer than spreadsheets and DMs.",
    detail: "Best for campaigns, PACs, advocacy groups, and aligned organizations running creator work.",
  },
];

export function RoleSelectionForm() {
  const [state, formAction, isPending] = useActionState(selectRoleAction, initialActionState);

  return (
    <SurfaceCard className="p-8 sm:p-10" variant="default">
      <div className="space-y-7">
        <div className="space-y-4">
          <span className="eyebrow-pill">Choose your role</span>
          <div className="space-y-3">
            <h1 className="display-font text-4xl leading-[0.98] text-slate-950 sm:text-5xl">
              Which side of PolitiViral are you joining?
            </h1>
            <p className="text-base leading-8 text-slate-600">
              Pick the experience that matches your workflow. Selecting a card sends you directly into the right onboarding flow.
            </p>
          </div>
        </div>

        <form action={formAction} className="grid gap-4">
          {roleOptions.map((option, index) => (
            <button
              className="group rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-6 text-left shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_56px_rgba(37,99,235,0.12)]"
              disabled={isPending}
              key={option.value}
              name="role"
              type="submit"
              value={option.value}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow-pill">{option.value}</span>
                  <span className="text-sm font-semibold text-blue-700">Step {index + 1}</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {option.title}
                  </h2>
                  <p className="text-sm leading-7 text-slate-600">{option.description}</p>
                </div>
                <p className="text-sm font-medium leading-7 text-slate-500">{option.detail}</p>
              </div>
            </button>
          ))}

          {state.error ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
              {state.error}
            </p>
          ) : (
            <p className="text-sm leading-7 text-slate-500">
              Choose a role card to continue. You will go straight into the matching onboarding flow.
            </p>
          )}
        </form>
      </div>
    </SurfaceCard>
  );
}
