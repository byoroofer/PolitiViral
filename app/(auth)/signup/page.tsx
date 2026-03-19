import { redirect } from "next/navigation";

import { RoleSelectionForm } from "@/components/auth/role-selection-form";
import { SignupForm } from "@/components/auth/signup-form";
import { SurfaceCard } from "@/components/ui/surface-card";
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
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_440px] lg:px-8 lg:py-14">
          <SurfaceCard className="hidden overflow-hidden p-10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_46%)]" />
            <div className="relative space-y-8">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
                Final signup step
              </span>
              <div className="space-y-4">
                <h2 className="display-font text-6xl leading-none text-slate-950">
                  Choose the side of PolitiViral you are joining.
                </h2>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Creator and campaign teams each get their own onboarding flow and dashboard shell.
                </p>
              </div>
            </div>
          </SurfaceCard>

          <RoleSelectionForm />
        </div>
      );
    }

    redirect(context ? getSignedInDestination(context.profile) : "/signup?step=role");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_440px] lg:px-8 lg:py-14">
      <SurfaceCard className="hidden overflow-hidden p-10 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_46%)]" />
        <div className="relative space-y-8">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700 uppercase">
            Campaigns and creators
          </span>
          <div className="space-y-4">
            <h2 className="display-font text-6xl leading-none text-slate-950">
              Create your PolitiViral account.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Start with account creation now, then choose your role and complete the matching onboarding flow.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <SignupForm
        loginRedirectPath={loginRedirectPath}
        postSignupPath="/signup?step=role"
      />
    </div>
  );
}
