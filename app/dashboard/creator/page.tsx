import { redirect } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getSignedInDestination } from "@/lib/auth/navigation";
import { requireUserContext } from "@/lib/data/user-context";

export default async function CreatorDashboardPage() {
  const context = await requireUserContext();

  if (!context.profile?.role) {
    redirect("/signup?step=role");
  }

  if (context.profile.role !== "creator") {
    redirect(getSignedInDestination(context.profile));
  }

  if (!context.profile.onboarding_completed) {
    redirect("/creator/onboarding");
  }

  const creatorName =
    context.creatorProfile?.display_name ?? context.profile.full_name ?? "Creator";

  return (
    <>
      <SurfaceCard className="p-8 sm:p-10" variant="dark">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.72rem] font-black tracking-[0.18em] text-blue-100 uppercase">
                Creator dashboard
              </span>
              <div className="space-y-3">
                <h1 className="display-font text-5xl leading-[0.94] text-white sm:text-6xl">
                  {creatorName} is set up for campaign-ready creator work.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-blue-50/82">
                  Milestone 1 gives you a polished creator shell, a campaign-legible profile, and a stronger foundation for future briefs and invites.
                </p>
              </div>
            </div>

            <ButtonLink href="/creator/onboarding" size="lg" variant="secondary">
              Edit creator profile
            </ButtonLink>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Primary platform</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.creatorProfile?.primary_platform ?? "Add in onboarding"}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Audience size</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.creatorProfile?.audience_size ?? "Add in onboarding"}
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
              <p className="text-xs font-black tracking-[0.18em] text-blue-100 uppercase">Content focus</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {context.creatorProfile?.content_focus ?? "Add in onboarding"}
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
                  Campaign activity
                </h2>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  Briefs, invites, and campaign asks will appear here as the collaboration layer expands.
                </p>
              </div>
              <span className="rounded-full border border-slate-200/80 bg-white/72 px-3 py-2 text-sm font-semibold text-slate-600">
                No active briefs
              </span>
            </div>

            <div className="grid grid-cols-[1.1fr_0.85fr_0.8fr] gap-4 px-6 py-4 text-xs font-black tracking-[0.16em] text-slate-500 uppercase">
              <span>Opportunity</span>
              <span>Platform</span>
              <span>Status</span>
            </div>

            <div className="border-t border-slate-200/70 px-6 py-8">
              <div className="rounded-[26px] border border-dashed border-slate-300/80 bg-slate-50/80 p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  No campaign briefs yet
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Once campaigns begin activating creators through the platform, your incoming opportunities and collaboration status will show up here in a cleaner queue.
                </p>
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <SurfaceCard className="p-8" variant="tint">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Profile strengths
                </h2>
                <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                  <li className="rounded-2xl border border-white/75 bg-white/72 px-4 py-3">
                    Platform specialization is visible at a glance.
                  </li>
                  <li className="rounded-2xl border border-white/75 bg-white/72 px-4 py-3">
                    Audience size and content focus are already organized for campaign review.
                  </li>
                  <li className="rounded-2xl border border-white/75 bg-white/72 px-4 py-3">
                    Your profile reads like political creator readiness, not generic marketplace positioning.
                  </li>
                </ul>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-8" variant="default">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  What to do next
                </h2>
                <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                  <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                    Keep your creator bio tight, political, and campaign-legible.
                  </li>
                  <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                    Make sure your platform and audience fields stay current.
                  </li>
                  <li className="rounded-2xl border border-slate-200/75 bg-white/74 px-4 py-3">
                    Be ready for future briefs covering persuasion, opinion, interview, and promo work.
                  </li>
                </ul>
              </div>
            </SurfaceCard>
          </div>
        </div>

        <div className="grid gap-6">
          <SurfaceCard className="p-8" variant="default">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Bio preview</h2>
              <p className="text-sm leading-7 text-slate-600">
                {context.creatorProfile?.bio ??
                  "Complete your creator onboarding to add a concise political creator bio here."}
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-8" variant="tint">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Ready for these content lanes
              </h2>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <div className="rounded-2xl border border-white/78 bg-white/74 px-4 py-3">
                  Persuasion videos
                </div>
                <div className="rounded-2xl border border-white/78 bg-white/74 px-4 py-3">
                  Opinion content
                </div>
                <div className="rounded-2xl border border-white/78 bg-white/74 px-4 py-3">
                  Interviews and promo moments
                </div>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </>
  );
}
