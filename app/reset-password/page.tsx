import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { PasswordRecoveryRequestForm } from "@/components/auth/password-recovery-request-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { getOptionalUser } from "@/lib/auth/session";
import { getSearchParamValue } from "@/lib/utils";

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const user = await getOptionalUser();
  const requestedMode = getSearchParamValue(resolvedSearchParams.mode);
  const errorMessage = getSearchParamValue(resolvedSearchParams.error);
  const statusMessage = getSearchParamValue(resolvedSearchParams.status);

  const showPasswordUpdate = requestedMode === "update" || Boolean(user);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8 lg:py-12">
      <AuthSidePanel
        badge={showPasswordUpdate ? "Secure recovery" : "Password recovery"}
        description={
          showPasswordUpdate
            ? "Finish the password reset flow on a PolitiViral page instead of a default backend-looking screen."
            : "Request a branded PolitiViral password reset email and finish recovery on an app-native screen."
        }
        items={
          showPasswordUpdate
            ? [
                {
                  label: "Authenticated recovery",
                  copy: "This screen is only for finishing the active password recovery session.",
                },
                {
                  label: "Branded auth flow",
                  copy: "The email, confirm link, and password update experience all stay in the PolitiViral brand layer.",
                },
                {
                  label: "Next step",
                  copy: "Set the new password, then go back to login and continue with your updated credentials.",
                },
              ]
            : [
                {
                  label: "Branded recovery email",
                  copy: "Send a PolitiViral reset email from your verified sending domain instead of Supabase shared mail.",
                },
                {
                  label: "App-native links",
                  copy: "Reset links return to PolitiViral routes rather than exposing generic auth infrastructure.",
                },
                {
                  label: "Cross-device friendly",
                  copy: "The request email and reset page are both designed to feel clean, trustworthy, and mobile-safe.",
                },
              ]
        }
        title={showPasswordUpdate ? "Choose a new password." : "Reset your PolitiViral password."}
      />

      {showPasswordUpdate ? (
        <ResetPasswordForm
          initialErrorMessage={errorMessage}
          initialStatusMessage={statusMessage}
        />
      ) : (
        <PasswordRecoveryRequestForm
          initialErrorMessage={errorMessage}
          initialStatusMessage={statusMessage}
        />
      )}
    </div>
  );
}
