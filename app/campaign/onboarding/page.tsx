import { redirect } from "next/navigation";

import { CampaignOnboardingForm } from "@/components/onboarding/campaign-onboarding-form";
import { OnboardingSidePanel } from "@/components/onboarding/onboarding-side-panel";
import { getSignedInDestination } from "@/lib/auth/navigation";
import { requireUserContext } from "@/lib/data/user-context";

export default async function CampaignOnboardingPage() {
  const context = await requireUserContext();

  if (!context.profile?.role) {
    redirect("/signup?step=role");
  }

  if (context.profile.role !== "campaign") {
    redirect(getSignedInDestination(context.profile));
  }

  if (context.profile.onboarding_completed && context.organization && context.campaignProfile) {
    redirect("/dashboard/campaign");
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
      <CampaignOnboardingForm
        campaignProfile={context.campaignProfile}
        organization={context.organization}
      />

      <OnboardingSidePanel
        actionHref="/for-campaigns"
        actionLabel="Review campaign fit"
        badge="Campaign onboarding"
        description="This gives your team a cleaner political creator operating story before deeper collaboration, invites, and tracked-link workflows come online."
        points={[
          "Campaign dashboard shell focused on creator activation instead of marketplace browsing.",
          "Structured fields for organization, initiative, budget, and launch timing.",
          "A stronger base for future creator briefing, invite, and tracked-link workflows.",
        ]}
        title="Set the creator program basics with enough polish to operate from."
      />
    </div>
  );
}
