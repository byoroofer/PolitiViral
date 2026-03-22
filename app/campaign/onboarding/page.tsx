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

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
      <CampaignOnboardingForm
        campaignProfile={context.campaignProfile}
        organization={context.organization}
      />

      <OnboardingSidePanel
        actionHref="/for-campaigns"
        actionLabel="Review campaign fit"
        badge={context.profile.onboarding_completed ? "Edit campaign setup" : "Campaign onboarding"}
        description={
          context.profile.onboarding_completed
            ? "Update your organization and campaign setup details without getting kicked back to the dashboard."
            : "This gives your team a cleaner political creator operating story before deeper collaboration, invites, and tracked-link workflows come online."
        }
        points={
          context.profile.onboarding_completed
            ? [
                "Refine organization, initiative, budget, and launch details from one editable setup page.",
                "Keep the campaign-facing operating basics current as the program evolves.",
                "Save changes and return to the campaign dashboard with refreshed setup data.",
              ]
            : [
                "Campaign dashboard shell focused on creator activation instead of marketplace browsing.",
                "Structured fields for organization, initiative, budget, and launch timing.",
                "A stronger base for future creator briefing, invite, and tracked-link workflows.",
              ]
        }
        title={
          context.profile.onboarding_completed
            ? "Keep the campaign setup current and editable."
            : "Set the creator program basics with enough polish to operate from."
        }
      />
    </div>
  );
}
