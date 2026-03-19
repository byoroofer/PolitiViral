import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUserContext } from "@/lib/data/user-context";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const context = await requireUserContext();

  if (!context.profile?.role) {
    redirect("/signup?step=role");
  }

  const role = context.profile.role;
  const title =
    role === "creator"
      ? context.creatorProfile?.display_name ?? context.profile.full_name ?? "Creator"
      : context.organization?.name ?? context.profile.full_name ?? "Campaign team";
  const subtitle =
    role === "creator"
      ? "Keep your creator profile sharp and ready for campaign briefs, approvals, and future invites."
      : "Keep your campaign setup, creator goals, and activation posture aligned in one polished workspace.";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <DashboardShell role={role} subtitle={subtitle} title={title}>
        {children}
      </DashboardShell>
    </div>
  );
}
