import { redirect } from "next/navigation";

import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LoginForm } from "@/components/auth/login-form";
import { getSafeRedirectPath } from "@/lib/auth/redirects";
import { getOptionalUser } from "@/lib/auth/session";
import { getSearchParamValue } from "@/lib/utils";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  const redirectPath = getSafeRedirectPath(
    getSearchParamValue(resolvedSearchParams.redirectedFrom),
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8 lg:py-12">
      <AuthSidePanel
        badge="Campaigns and creators"
        description="Jump back into the political creator operating layer with the same premium structure across onboarding, campaign setup, and creator readiness."
        items={[
          {
            label: "Campaign setup",
            copy: "Review organization details, program goals, and creator activation priorities.",
          },
          {
            label: "Creator readiness",
            copy: "Keep platform, audience, and content focus polished for campaign review.",
          },
          {
            label: "Workspace shell",
            copy: "Return to dashboards built to feel organized, credible, and ready for the next milestone.",
          },
        ]}
        title="Log back into the PolitiViral workspace."
      />

      <LoginForm redirectPath={redirectPath} />
    </div>
  );
}
