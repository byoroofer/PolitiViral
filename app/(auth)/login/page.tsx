import { redirect } from "next/navigation";

import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LoginForm } from "@/components/auth/login-form";
import { MagicLinkRequestForm } from "@/components/auth/magic-link-request-form";
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
  const initialErrorMessage = getSearchParamValue(resolvedSearchParams.error);
  const initialStatusMessage = getSearchParamValue(resolvedSearchParams.status);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-8 lg:py-12">
      <AuthSidePanel
        badge="Campaigns and creators"
        description="Jump back into the political creator operating layer with the same premium structure across onboarding, campaign setup, and creator readiness."
        items={[
          {
            label: "Password access",
            copy: "Use your account password and return directly to your creator or campaign workspace.",
          },
          {
            label: "Magic link login",
            copy: "Request a branded PolitiViral sign-in email when you prefer inbox-based access.",
          },
          {
            label: "Password recovery",
            copy: "Send a branded reset email and complete recovery on app-native PolitiViral pages.",
          },
        ]}
        title="Log back into the PolitiViral workspace."
      />

      <div className="grid gap-6">
        <LoginForm
          initialErrorMessage={initialErrorMessage}
          initialStatusMessage={initialStatusMessage}
          redirectPath={redirectPath}
        />
        <MagicLinkRequestForm redirectPath={redirectPath} />
      </div>
    </div>
  );
}
