"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { LogoMark } from "@/components/ui/logo-mark";
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
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="app-shell rounded-[30px] p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LogoMark />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
                    PolitiViral
                  </p>
                  <p className="text-sm text-slate-500">
                    {role === "creator" ? "Creator workspace" : "Campaign workspace"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
                <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
              </div>
            </div>

            <nav className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    className={cx(
                      "rounded-2xl border px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "border-blue-200 bg-blue-50 text-blue-800 shadow-[0_18px_40px_rgba(37,99,235,0.1)]"
                        : "border-slate-200 bg-white/80 text-slate-700 hover:border-blue-200 hover:bg-white hover:text-slate-950",
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-950">Milestone 1</p>
              <p className="mt-2 leading-6">
                Auth, role selection, onboarding, and polished dashboard shells are live. Deeper
                creator collaboration workflows come next.
              </p>
            </div>

            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="grid gap-6">{children}</div>
    </div>
  );
}
