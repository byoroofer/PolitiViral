import { redirect } from "next/navigation";

import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { RoleSelectionForm } from "@/components/auth/role-selection-form";
import { SignupForm } from "@/components/auth/signup-form";
import { getSignedInDestination } from "@/lib/auth/navigation";
import { getSafeRedirectPath } from "@/lib/auth/redirects";
import { getOptionalUser } from "@/lib/auth/session";
import { getUserContext } from "@/lib/data/user-context";
import { getSearchParamValue } from "@/lib/utils";

type SignupPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await searchParams;
  const loginRedirectPath = getSafeRedirectPath(
    getSearchParamValue(resolvedSearchParams.redirectedFrom),
  );
  const step = getSearchParamValue(resolvedSearchParams.step);
  const user = await getOptionalUser();

  if (user) {
    const context = await getUserContext();

    if (step === "role") {
      if (context?.profile?.role) {
        redirect(getSignedInDestination(context.profile));
      }

      return (
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8 lg:py-12">
          <AuthSidePanel
            badge="Final signup step"
            description="Choose the side of the platform you are joining and move directly into the onboarding flow built for that workflow."
            items={[
              {
                label: "Creator path",
                copy: "Campaign-ready profile setup, creator dashboard shell, and future brief readiness.",
              },
              {
                label: "Campaign path",
                copy: "Campaign setup, program goals, and a dashboard shell designed for creator activation operations.",
              },
              {
                label: "Immediate next step",
                copy: "Pick your role and continue into the matching onboarding flow right away.",
              },
            ]}
            title="Choose which side of PolitiViral you are joining."
          />

          <RoleSelectionForm />
        </div>
      );
    }

    redirect(context ? getSignedInDestination(context.profile) : "/signup?step=role");
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8 lg:py-12">
      <AuthSidePanel
        badge="Campaigns and creators"
        description="Start with account creation, then move into role selection and the onboarding flow built for either a campaign team or a political content creator."
        items={[
          {
            label: "Step 1",
            copy: "Create your account with email and password.",
          },
          {
            label: "Step 2",
            copy: "Choose creator or campaign so PolitiViral routes you into the right workspace.",
          },
          {
            label: "Step 3",
            copy: "Complete onboarding and land in a dashboard shell built for real political operations.",
          },
        ]}
        title="Create your PolitiViral account."
      />

      <SignupForm loginRedirectPath={loginRedirectPath} postSignupPath="/signup?step=role" />
    </div>
  );
}
