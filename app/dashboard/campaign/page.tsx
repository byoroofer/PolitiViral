import { redirect } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getSignedInDestination } from "@/lib/auth/navigation";
import { requireUserContext } from "@/lib/data/user-context";

const programLanes = [
  {
    title: "Persuasion lane",
    description: "Issue explainers, values framing, and direct voter persuasion content.",
  },
  {
    title: "Narrative lane",
    description: "Opinion videos, creator commentary, and campaign-moment amplification.",
  },
  {
    title: "Action lane",
    description: "Tracked actions, merch pushes, event momentum, and civic participation asks.",
  },
];

export default async function CampaignDashboardPage() {
  const context = await requireUserContext();

  if (!context.profile?.role) {
    redirect("/signup?step=role");
  }

  if (context.profile.role !== "campaign") {
    redirect(getSignedInDestination(context.profile));
  }

  if (!context.profile.onboarding_completed) {
    redirect("/campaign/onboarding");
  }

  const organizationName = context.organization?.name ?? "Campaign workspace";

  return (
    <>
      <SurfaceCard className="p-8 sm:p-10" variant="dark">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.72rem] font-black tracking-[0.18em] text-blue-100 uppercase">
                Campaign dashboard
              </span>
              <div className="space-y-3">
                <h1 className="display-font text-5xl leading-[0.94] text-white sm:text-6xl">
                  {organizationName} is set up for creator activation.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-blue-50/82">
                  Milestone 1 gives your team a structured campaign shell for creator program setup without pretending the full marketplace and billing stack is already live.
                </p>
              </div>
            </div>

            <ButtonLink href="/campaign/onboarding" size="lg" variant="secondary">
              Edit campaign setup
            </ButtonLink>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Initiative</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.campaignProfile?.campaign_name ?? "Add in onboarding"}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Geography</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.campaignProfile?.geography_focus ?? "Add in onboarding"}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Creator budget</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.campaignProfile?.creator_budget ?? "Add in onboarding"}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Launch timeline</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.campaignProfile?.launch_timeline ?? "Add in onboarding"}
              </p>
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <SurfaceCard className="overflow-hidden p-0" variant="default">
            <div className="flex flex-col gap-4 border-b border-slate-200/75 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Creator pipeline
                </h2>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  Future creator invites, approvals, and program activity will appear here as that workflow comes online.
                </p>
              </div>
              <span className="rounded-full border border-slate-200/80 bg-white/72 px-3 py-2 text-sm font-semibold text-slate-600">
                No invites yet
              </span>
            </div>

            <div className="grid grid-cols-[1fr_0.9fr_0.8fr] gap-4 px-6 py-4 text-xs font-black tracking-[0.16em] text-slate-500 uppercase">
              <span>Lane</span>
              <span>Platform</span>
              <span>Status</span>
            </div>

            <div className="border-t border-slate-200/70 px-6 py-8">
              <div className="rounded-[26px] border border-dashed border-slate-300/80 bg-slate-50/80 p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  Your creator queue is empty
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  As creator matching and invite workflows expand, this table becomes the clean operating view for who is in motion, where they are being activated, and what needs attention.
                </p>
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-6 lg:grid-cols-3">
            {programLanes.map((lane, index) => (
              <SurfaceCard className="p-7" key={lane.title} variant={index === 0 ? "tint" : "default"}>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {lane.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">{lane.description}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <SurfaceCard className="p-8" variant="default">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Creator goal</h2>
              <p className="text-sm leading-7 text-slate-600">
                {context.campaignProfile?.creator_goal ??
                  "Complete campaign onboarding to add your creator activation goal here."}
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-8" variant="tint">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Current release focus
              </h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                  Establish fit and operating basics.
                </li>
                <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                  Give the team a cleaner creator-program dashboard shell.
                </li>
                <li className="rounded-2xl border border-white/80 bg-white/74 px-4 py-3">
                  Prepare the app for future briefing and tracked-link workflows.
                </li>
              </ul>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </>
  );
}
