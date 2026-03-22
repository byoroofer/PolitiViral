import { redirect } from "next/navigation";

import { CreatorOnboardingForm } from "@/components/onboarding/creator-onboarding-form";
import { OnboardingSidePanel } from "@/components/onboarding/onboarding-side-panel";
import { getSignedInDestination } from "@/lib/auth/navigation";
import { requireUserContext } from "@/lib/data/user-context";

export default async function CreatorOnboardingPage() {
  const context = await requireUserContext();

  if (!context.profile?.role) {
    redirect("/signup?step=role");
  }

  if (context.profile.role !== "creator") {
    redirect(getSignedInDestination(context.profile));
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
      <CreatorOnboardingForm initialValues={context.creatorProfile} />

      <OnboardingSidePanel
        actionHref="/for-creators"
        actionLabel="Review creator benefits"
        badge={context.profile.onboarding_completed ? "Edit creator profile" : "Creator onboarding"}
        description={
          context.profile.onboarding_completed
            ? "Update the creator profile that campaigns use to evaluate your platform, audience, voice, and political fit."
            : "A polished creator profile helps campaigns understand your platform, audience, voice, and political fit without guesswork."
        }
        points={
          context.profile.onboarding_completed
            ? [
                "Adjust platform, audience, and content details without getting bounced back to the dashboard.",
                "Keep your campaign-facing profile current as your creator positioning evolves.",
                "Save changes and return to the creator dashboard with the refreshed profile data.",
              ]
            : [
                "Creator dashboard shell shaped for campaign collaboration.",
                "A cleaner surface for future political briefs and approvals.",
                "A profile that reads like campaign-fit information instead of generic creator marketplace copy.",
              ]
        }
        title={
          context.profile.onboarding_completed
            ? "Keep the creator profile sharp for campaign review."
            : "This is the profile campaigns will size up first."
        }
      />
    </div>
  );
}
