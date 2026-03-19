"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { LogoMark } from "@/components/ui/logo-mark";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cx } from "@/lib/utils";
import type { AppRole } from "@/lib/auth/navigation";

type DashboardShellProps = {
  children: ReactNode;
  role: AppRole;
  subtitle: string;
  title: string;
};

export function DashboardShell({ children, role, subtitle, title }: DashboardShellProps) {
  const pathname = usePathname();

  const navItems =
    role === "creator"
      ? [
          { href: "/dashboard/creator", label: "Overview" },
          { href: "/creator/onboarding", label: "Creator profile" },
          { href: "/for-creators", label: "Creator fit" },
          { href: "/pricing", label: "Pricing" },
        ]
      : [
          { href: "/dashboard/campaign", label: "Overview" },
          { href: "/campaign/onboarding", label: "Campaign setup" },
          { href: "/for-campaigns", label: "Campaign fit" },
          { href: "/pricing", label: "Pricing" },
        ];

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="xl:sticky xl:top-24 xl:self-start">
        <div className="app-shell rounded-[34px] p-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div>
                <p className="text-xs font-black tracking-[0.2em] text-blue-700 uppercase">
                  PolitiViral
                </p>
                <p className="text-sm text-slate-500">
                  {role === "creator" ? "Creator workspace" : "Campaign workspace"}
                </p>
              </div>
            </div>

            <SurfaceCard className="p-5" variant="dark">
              <div className="space-y-3">
                <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.72rem] font-black tracking-[0.18em] text-blue-100 uppercase">
                  {role}
                </span>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
                  <p className="text-sm leading-7 text-blue-50/82">{subtitle}</p>
                </div>
              </div>
            </SurfaceCard>

            <nav className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    className={cx(
                      "rounded-[20px] border px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "border-blue-200 bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(255,255,255,0.92))] text-blue-800 shadow-[0_18px_42px_rgba(37,99,235,0.12)]"
                        : "border-slate-200/75 bg-white/76 text-slate-700 hover:-translate-y-0.5 hover:border-blue-200 hover:text-slate-950",
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <SurfaceCard className="p-5" variant="tint">
              <div className="space-y-3">
                <p className="text-xs font-black tracking-[0.18em] text-blue-700 uppercase">
                  Milestone 1
                </p>
                <p className="text-sm leading-7 text-slate-600">
                  Auth, role selection, onboarding, and premium dashboard shells are live. Creator program workflow depth comes next.
                </p>
              </div>
            </SurfaceCard>

            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="grid gap-6">{children}</div>
    </div>
  );
}
